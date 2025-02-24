import PostBox from "components/posts/PostBox";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import {
  query,
  where,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";

const SearchPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);

  const t = useTranslation();
  // 검색 값 핸들링
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e.target.value.trim());
  };

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(
        postsRef,
        where("hashTags", "array-contains-any", [tagQuery]),
        orderBy("createdAt", "desc")
      );

      onSnapshot(postsQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [tagQuery, user]);

  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>
          <div className='home__title-text'>{t("MENU_SEARCH")}</div>
        </div>
        <div className='home__search-div'>
          <input
            type='text'
            className='home__search'
            placeholder={t("SEARCH_HASHTAGS")}
            onChange={onChangeSearch}
          />
        </div>
      </div>
      <div className='post'>
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className='post__no-posts'>
            <div className='post__text'>{t("ALERT_NO_SEARCH_LIST")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
