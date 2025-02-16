import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

interface PostBoxProps {
  post: PostProps;
}
const PostBox = ({ post }: PostBoxProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageRef = ref(storage, post?.imageUrl); // 삭제할 이미지 url 참조
  // 게시글 삭제 이벤트
  const handleDelete = async () => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm) {
      //storage에 등록된 이미지 먼저 삭제

      if (post?.imageUrl) {
        deleteObject(imageRef).catch(() => {
          toast.error("");
        });
      }

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
          {post?.imageUrl && (
            <div className='post__box-image-div'>
              <img
                src={post?.imageUrl}
                alt='post-image'
                className='post__box-image'
              />
            </div>
          )}
          <div className='post-form__hashtags-outputs'>
            {post?.hashTags?.map((tag, idx) => (
              <span className='post-form__hashtags-tag' key={idx}>
                #{tag}
              </span>
            ))}
          </div>
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
