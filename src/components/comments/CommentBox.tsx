import { PostProps } from "pages/home";
import UserImg from "assets/images/user.png";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import styles from "./Comment.module.scss";
import useTranslation from "hooks/useTranslation";

export interface CommentProps {
  comment: string;
  uid: string;
  email: string;
  createdAt: string;
}

interface CommentBoxProps {
  data: CommentProps;
  post: PostProps;
}
const CommentBox = ({ data, post }: CommentBoxProps) => {
  const { user } = useContext(AuthContext);
  const t = useTranslation();

  // 댓글 삭제 이벤트
  const handleDeleteComment = async () => {
    if (post) {
      const confirm = window.confirm(t("CONFIRM_DELETE_COMMENT"));
      if (confirm) {
        try {
          const postRef = doc(db, "posts", post?.id);

          await updateDoc(postRef, {
            comments: arrayRemove(data),
          });

          toast.success(t("ALERT_DELETE_COMMENT"));
        } catch (err) {
          toast.error(t("ALERT_DELETE_COMMENT_ERROR"));
        }
      }
    }
  };
  return (
    <div key={data?.createdAt} className={styles.comment}>
      <div className={styles.comment__borderBox}>
        <div className={styles.comment__imgBox}>
          <div className={styles.comment__flexBox}>
            <img src={UserImg} alt='profile' />
            <div className={styles.comment__email}>{data?.email}</div>
            <div className={styles.comment__createdAt}>{data?.createdAt}</div>
          </div>
        </div>
        <div className={styles.comment__content}>{data?.comment}</div>
        <div className={styles.comment__submitDiv}>
          {user?.uid === data?.uid && (
            <button
              type='button'
              className='comment__delete-btn'
              onClick={handleDeleteComment}
            >
              {t("BUTTON_DELETE")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
