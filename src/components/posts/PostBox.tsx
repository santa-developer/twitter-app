import { PostProps } from "pages/home";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

interface PostBoxProps {
  post: PostProps;
}
const PostBox = ({ post }: PostBoxProps) => {
  // 게시글 삭제 이벤트
  const handleDelete = () => {};
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
        {/* post.uid === user.uid 일 때 */}
        <>
          <button type='button' className='post__delete' onClick={handleDelete}>
            Delete
          </button>
          <button type='button' className='post__edit'>
            <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
          </button>
        </>
        <button type='button' className='post__likes' onClick={handleDelete}>
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
