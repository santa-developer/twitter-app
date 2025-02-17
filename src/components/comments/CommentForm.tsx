import AuthContext from "context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export interface CommentFormProps {
  post: PostProps | null;
}

const CommentForm = ({ post }: CommentFormProps) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState<string>("");

  // 입력 값 변경 이벤트
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const { value } = target;

    setComment(value);
  };

  // 제출 이벤트
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post && user) {
      try {
        const postRef = doc(db, "posts", post?.id);

        const commentObj = {
          comment: comment,
          uid: user?.uid,
          email: user?.email,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
        });

        toast.success("댓글을 추가했습니다.");
        setComment("");
      } catch (e) {}
    }
  };

  return (
    <form className='post-form' onSubmit={onSubmit}>
      <textarea
        className='post-form__textarea'
        name='comment'
        id='comment'
        value={comment}
        required
        placeholder='Enter a comment.'
        onChange={onChange}
      />
      <div className='post-form__submit-area'>
        <div />
        <input
          type='submit'
          value='Comment'
          className='post-form__submit-btn'
          disabled={!comment}
        />
      </div>
    </form>
  );
};

export default CommentForm;
