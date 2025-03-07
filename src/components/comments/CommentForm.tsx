import AuthContext from "context/AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { PostProps } from "pages/home";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export interface CommentFormProps {
  post: PostProps | null;
}

const CommentForm = ({ post }: CommentFormProps) => {
  const { user } = useContext(AuthContext);
  const t = useTranslation();
  const [comment, setComment] = useState<string>("");

  // 알림에 제목 내용이 길 경우 텍스트 자르기
  const truncate = (str: string) => {
    return str.length > 10 ? str?.substring(0, 10) + "..." : str;
  };

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

        if (user?.uid !== post?.uid) {
          // 댓글 생성 알림 만들기
          await addDoc(collection(db, "notifications"), {
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            uid: post?.uid,
            isRead: false,
            url: `/posts/${post?.id}`,
            content: t("ALERT_COMMENT_POST", {
              postContent: truncate(post?.content),
            }),
          });
        }

        toast.success(t("ALERT_COMMENT_ADD"));
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
        placeholder={t("COMMENT_PLACEHOLDER")}
        onChange={onChange}
      />
      <div className='post-form__submit-area'>
        <div />
        <input
          type='submit'
          value={t("BUTTON_COMMENT")}
          className='post-form__submit-btn'
          disabled={!comment}
        />
      </div>
    </form>
  );
};

export default CommentForm;
