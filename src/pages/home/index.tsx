import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

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
  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>Home</div>
        <div className='home__tabs'>
          <div className='home__tab home__tab--active'>For You</div>
          <div className='home__tab'>Following</div>
        </div>
      </div>

      {/* post form */}
      <PostForm />

      {/* tweet  posts*/}
      <div className='post'>
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
