import AuthContext from "context/AuthContext";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FollowingProps {
  post: PostProps;
}

interface UserProps {
  id: string;
}

const FollowingBox = ({ post }: FollowingProps) => {
  const { user } = useContext(AuthContext);
  const [postFollowers, setPostFollowers] = useState<any>([]);

  const t = useTranslation();

  // 알림에 텍스트가 길 경우 텍스트 자르기
  const truncate = (str: string) => {
    return str.length > 10 ? str?.substring(0, 10) + "..." : str;
  };

  // 팔로잉 이벤트
  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (user?.uid) {
        // 팔로잉 컬렉션 생성 or 업데이트 (팔로잉 하는 사람이 주체)
        const followingRef = doc(db, "following", user.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({
              id: post?.uid,
            }),
          },
          { merge: true }
        );

        // 팔로우 컬렉션 생성 or 업데이트 (팔로우 받는 사람 주체)
        const followerRef = doc(db, "follower", post?.uid);
        await setDoc(
          followerRef,
          {
            users: arrayUnion({
              id: user?.uid,
            }),
          },
          { merge: true }
        );

        if (user?.uid !== post?.uid) {
          // 팔로우 알림 만들기
          await addDoc(collection(db, "notifications"), {
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            uid: post?.uid,
            isRead: false,
            url: "#",
            content: `${user?.email || user?.displayName} ${t(
              "ALERT_FOLLOW_YOU"
            )}`,
          });
        }
        toast.success(t("ALERT_FOLLOW"));
      }
    } catch (err) {}
  };

  // 팔로우 취소 이벤트
  const hanleDeleteFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    e.preventDefault();

    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user?.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: post?.uid }),
        });

        const followerRef = doc(db, "follower", post?.uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user.uid }),
        });

        toast.success(t("ALERT_UNFOLLOW"));
      }
    } catch (err) {}
  };

  const getFollowers = useCallback(async () => {
    if (post.uid) {
      const ref = doc(db, "follower", post?.uid);
      onSnapshot(ref, (doc) => {
        setPostFollowers([]);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setPostFollowers((prev: UserProps[]) =>
              prev ? [...prev, user?.id] : []
            )
          );
      });
    }
  }, [post.uid]);
  useEffect(() => {
    if (post?.uid) getFollowers();
  }, [getFollowers, post?.uid]);

  return (
    <>
      {user?.uid !== post?.uid &&
        (postFollowers?.includes(user?.uid) ? (
          <button
            type='button'
            className='post__following-btn'
            onClick={hanleDeleteFollow}
          >
            {t("BUTTON_FOLLOWING")}
          </button>
        ) : (
          <button className='post__follow-btn' onClick={handleFollow}>
            {t("BUTTON_FOLLOW")}
          </button>
        ))}
    </>
  );
};

export default FollowingBox;
