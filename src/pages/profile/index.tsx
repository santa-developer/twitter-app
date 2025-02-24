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
import { MdOutlineLanguage } from "react-icons/md";
import { useRecoilState } from "recoil";
import { languageState } from "atom";
import useTranslation from "hooks/useTranslation";

type TabType = "my" | "like";
const ProfilePage = () => {
  const [activeTab, setAtivedTab] = useState<TabType>("my");
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);

  const t = useTranslation();
  const [lang, setLang] = useRecoilState(languageState);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(lang);
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

  // 한영 변환
  const onClickLanguage = () => {
    setLang(lang === "ko" ? "en" : "ko");
    localStorage.setItem("language", lang === "ko" ? "en" : "ko");
  };
  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>{t("MENU_PROFILE")}</div>
        <div className='profile'>
          <div className='profile__box'>
            <img
              src={user?.photoURL || ProfileImage}
              alt='profile'
              className='profile__image'
            />
            <div className='profile__text'>
              <div className='profile__name'>
                {user?.displayName || t("PROFILE_NAME")}
              </div>
              <div className='profile__email'>{user?.email}</div>
            </div>
          </div>
          <div className='profile__flex'>
            <button
              type='button'
              className='profile__btn'
              onClick={() => navigate("/profile/edit")}
            >
              {t("BUTTON_EDIT_PROFILE")}
            </button>
            <button
              type='button'
              className='profile__btn--lang'
              onClick={onClickLanguage}
            >
              <div className='lang-btn'>
                <MdOutlineLanguage size='16' />
                <span>{lang === "ko" ? "한국어" : "English"}</span>
              </div>
            </button>
          </div>
        </div>

        <div className='home__tabs'>
          <div
            // className='home__tab home__tab--active'
            className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
            onClick={() => setAtivedTab("my")}
          >
            {t("TAB_MY")}
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => setAtivedTab("like")}
          >
            {t("TAB_LIKES")}
          </div>
        </div>

        {activeTab === "my" && (
          <div className='post'>
            {myPosts?.length > 0 ? (
              myPosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className='post__no-posts'>
                <div className='post__text'>{t("NO_POSTS")}</div>
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
                <div className='post__text'>{t("NO_POSTS")}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
