import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImage from "assets/images/user.png";

type TabType = "my" | "like";
const ProfilePage = () => {
  const [activeTab, setAtivedTab] = useState<TabType>("my");
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      const myPostsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const likePostsQuery = query(
        postsRef,
        where("likes", "array-contains", user.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(myPostsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setMyPosts(dataObj as PostProps[]);
      });
      onSnapshot(likePostsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setLikePosts(dataObj as PostProps[]);
      });
    }
  }, [user]);
  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>Profile</div>
        <div className='profile'>
          <div className='profile__box'>
            <img
              src={user?.photoURL || ProfileImage}
              alt='profile'
              className='profile__image'
            />
            <div className='profile__Text'>
              <div className='profile__name'>
                {user?.displayName || "사용자 님"}
              </div>
              <div className='profile__email'>{user?.email}</div>
            </div>
          </div>

          <button
            type='button'
            className='profile__btn'
            onClick={() => navigate("/profile/edit")}
          >
            프로필 수정
          </button>
        </div>

        <div className='home__tabs'>
          <div
            // className='home__tab home__tab--active'
            className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
            onClick={() => setAtivedTab("my")}
          >
            For You
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => setAtivedTab("like")}
          >
            Likes
          </div>
        </div>

        {activeTab === "my" && (
          <div className='post'>
            {myPosts?.length > 0 ? (
              myPosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className='post__no-posts'>
                <div className='post__text'>게시글이 없습니다.</div>
              </div>
            )}
          </div>
        )}
        {activeTab === "like" && (
          <div className='post'>
            {likePosts?.length > 0 ? (
              likePosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className='post__no-posts'>
                <div className='post__text'>게시글이 없습니다.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
