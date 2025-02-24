import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import FollowingBox from "components/following/FollowingBox";
import useTranslation from "hooks/useTranslation";

interface PostBoxProps {
  post: PostProps;
}
const PostBox = ({ post }: PostBoxProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const t = useTranslation();
  const imageRef = ref(storage, post?.imageUrl); // 삭제할 이미지 url 참조
  // 게시글 삭제 이벤트
  const handleDelete = async () => {
    const confirm = window.confirm(t("CONFIRM_DELETE_POST"));
    if (confirm) {
      //storage에 등록된 이미지 먼저 삭제

      if (post?.imageUrl) {
        deleteObject(imageRef).catch(() => {
          toast.error("");
        });
      }

      await deleteDoc(doc(db, "posts", post.id));

      toast.success(t("ALERT_DELETE_POST"));
      navigate("/");
    }
  };

  // 좋아요 이벤트
  const toggleLikeBtn = async () => {
    const postRef = doc(db, "posts", post.id);

    if (user?.uid && post?.likes?.includes(user?.uid)) {
      //사용자가 좋아요를 누른 경우 -> 좋아요 취소
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      // 사용자의 좋아요가 없는 경우 -> 좋아요를 추가한다.}
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });
    }
  };
  return (
    <div className='post__box' key={post?.id}>
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
          <div className='post__flex--between'>
            <div className='post__flex post__mobile-flex'>
              <div className='post__email'>{post?.email}</div>
              <div className='post__createdAt'> {post?.createdAt}</div>
            </div>
            <FollowingBox post={post} />
          </div>
        </div>
        <Link to={`/posts/${post.id}`}>
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
        </Link>
      </div>
      <div className='post__box-footer'>
        {user?.uid === post?.uid && (
          <>
            <button
              type='button'
              className='post__delete'
              onClick={handleDelete}
            >
              {t("BUTTON_DELETE")}
            </button>
            <button type='button' className='post__edit'>
              <Link to={`/posts/edit/${post?.id}`}>{t("BUTTON_EDIT")}</Link>
            </button>
          </>
        )}

        <button type='button' className='post__likes' onClick={toggleLikeBtn}>
          {user && post?.likes?.includes(user.uid) ? (
            <FaHeart size={15} />
          ) : (
            <FaRegHeart size={15} />
          )}
          {post?.likeCount || 0}
        </button>
        <button type='button' className='post__comments'>
          <FaRegCommentDots size={15} /> {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
};

export default PostBox;
