import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";

interface PostBoxProps {
  post: PostProps;
}
const PostBox = ({ post }: PostBoxProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // 게시글 삭제 이벤트
  const handleDelete = async () => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, "posts", post.id));

      toast.success("게시글을 삭제하였습니다.");
      navigate("/");
    }
  };
  return (
    <div className='post__box' key={post?.id}>
      <Link to={`/posts/${post.id}`}>
        <div className='post__box-profile'>
          <div className='post__flex'>
            {post?.profileUrl ? (
              <img
                src={post?.profileUrl}
                alt='profile'
                className='post__box-profile-img'
              />
            ) : (
              <FaUserCircle className='post__box-profile-icon' />
            )}
            <div className='post__email'>{post?.email}</div>
            <div className='post__createdAt'> {post?.createdAt}</div>
          </div>
          <div className='post__box-content'>{post?.content}</div>
        </div>
      </Link>
      <div className='post__box-footer'>
        {user?.uid === post?.uid && (
          <>
            <button
              type='button'
              className='post__delete'
              onClick={handleDelete}
            >
              Delete
            </button>
            <button type='button' className='post__edit'>
              <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
            </button>
          </>
        )}

        <button type='button' className='post__likes'>
          <FaHeart /> {post?.likes || 0}
        </button>
        <button type='button' className='post__comments'>
          <FaRegCommentDots /> {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
};

export default PostBox;
