import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import { useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";
import { CommentProps } from "components/comments/CommentBox";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: CommentProps[];
  hashTags?: string[];
  imageUrl?: string;
}

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);
  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>Home</div>
        <div className='home__tabs'>
          <div className='home__tab home__tab--active'>For You</div>
          <div className='home__tab'>Following</div>
        </div>
      </div>

      {/* post form */}
      <PostForm />

      {/* tweet  posts*/}
      <div className='post'>
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className='post__no-posts'>
            <div className='post__text'>게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
