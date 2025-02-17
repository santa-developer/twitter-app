import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";

import Loader from "components/loader/Loader";
import PostBox from "components/posts/PostBox";
import { useParams } from "react-router-dom";
import { db } from "firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import BackBtn from "components/posts/BackBtn";
import CommentForm from "components/comments/CommentForm";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className='post'>
      <BackBtn />
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
