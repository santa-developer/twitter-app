import { PostProps } from "pages/home";
import UserImg from "assets/images/user.png";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import styles from "./Comment.module.scss";

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

  // 댓글 삭제 이벤트
  const handleDeleteComment = async () => {
    if (post) {
      const confirm = window.confirm("댓글을 삭제하시겠습니까?");
      if (confirm) {
        try {
          const postRef = doc(db, "posts", post?.id);

          await updateDoc(postRef, {
            comments: arrayRemove(data),
          });

          toast.success("댓글을 삭제했습니다.");
        } catch (err) {
          toast.error("댓글을 삭제하지 못했습니다.");
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
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
