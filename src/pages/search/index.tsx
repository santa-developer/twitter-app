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

const SearchPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);

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
          <div className='home__title-text'>Search</div>
        </div>
        <div className='home__search-div'>
          <input
            type='text'
            className='home__search'
            placeholder='해시태그 검색'
            onChange={onChangeSearch}
          />
        </div>
      </div>
      <div className='post'>
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className='post__no-posts'>
            <div className='post__text'>검색 결과가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
