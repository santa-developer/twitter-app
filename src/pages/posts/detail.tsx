import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";

import Loader from "components/loader/Loader";
import PostBox from "components/posts/PostBox";
import { useParams } from "react-router-dom";
import { db } from "firebaseApp";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import BackBtn from "components/posts/BackBtn";
import CommentForm from "components/comments/CommentForm";
import CommentBox, { CommentProps } from "components/comments/CommentBox";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);

      onSnapshot(docRef, (doc) => {
        setPost({ ...(doc.data() as PostProps), id: doc.id });
      });
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
          {post?.comments
            ?.slice(0)
            ?.reverse()
            ?.map((data: CommentProps, idx: number) => (
              <CommentBox key={idx} data={data} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
