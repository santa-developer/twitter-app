import AuthContext from "context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
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

        toast.success("팔로우 하였습니다.");
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

        toast.success("팔로우를 취소했습니다.");
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
            Following
          </button>
        ) : (
          <button className='post__follow-btn' onClick={handleFollow}>
            Follower
          </button>
        ))}
    </>
  );
};

export default FollowingBox;
