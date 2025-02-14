import { FiImage } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "내용입니다.",
    createdAt: "2025-01-02",
    uid: "01",
  },
  {
    id: "2",
    email: "test2@test.com",
    content: "내용입니다.",
    createdAt: "2025-01-02",
    uid: "02",
  },
  {
    id: "3",
    email: "test3@test.com",
    content: "내용입니다.",
    createdAt: "2025-01-02",
    uid: "03",
  },
  {
    id: "4",
    email: "test4@test.com",
    content: "내용입니다.",
    createdAt: "2025-01-02",
    uid: "04",
  },
  {
    id: "5",
    email: "test@test.com",
    content: "내용입니다.",
    createdAt: "2025-01-02",
    uid: "05",
  },
];

const HomePage = () => {
  // 이미지 업로드 이벤트
  const handleFileUpload = () => {};

  // 게시글 삭제 이벤트
  const handleDelete = () => {};
  return (
    <div className='home'>
      <div className='home__title'>Home</div>
      <div className='home__tabs'>
        <div className='home__tab home__tab--active'>For You</div>
        <div className='home__tab'>Following</div>
      </div>
      {/* post form */}
      <form className='post-form'>
        <textarea
          name='content'
          id='content'
          placeholder='What is happening?'
          className='post-form__textarea'
          required
        />
        <div className='post-form__submit-area'>
          {/* htmlFor='file-input' */}
          <label htmlFor='file-input' className='post-form__file'>
            <FiImage className='post-form__file-icon' />
          </label>
          <input
            type='file'
            name='file-input'
            accept='image/*'
            onChange={handleFileUpload}
            className='hidden'
          />
          <input
            type='submit'
            value='Tweet'
            className='post-form__submit-btn'
          />
        </div>
      </form>
      {/* tweet  posts*/}
      <div className='post'>
        {posts?.map((post) => (
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
              <button
                type='button'
                className='post__likes'
                onClick={handleDelete}
              >
                <FaHeart /> {post?.likes || 0}
              </button>
              <button type='button' className='post__comments'>
                <FaRegCommentDots /> {post?.comments?.length || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
