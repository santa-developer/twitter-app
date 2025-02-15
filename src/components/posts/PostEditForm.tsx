import { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home";

const PostEditForm = () => {
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  // 이미지 업로드 이벤트
  const handleFileUpload = () => {};

  // 텍스트 입력 이벤트
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (name === "content") {
      setContent(value);
    }
  };

  // getDoc()을 통해 컨텐츠 데이터 조회하기
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap.data()?.content);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost, params.id]);

  // 폼 제출 이벤트
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.content !== content) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, { content: content });
        toast.success("게시글이 수정되었습니다.");
        navigate(`/posts/${post?.id}`);
      } else {
        toast.info("수정된 내용이 없습니다.");
      }
    } catch (e) {}
  };
  return (
    <form className='post-form' onSubmit={onSubmit}>
      <textarea
        name='content'
        id='content'
        placeholder='What is happening?'
        className='post-form__textarea'
        required
        value={content}
        onChange={onChange}
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
        <input type='submit' value='Edit' className='post-form__submit-btn' />
      </div>
    </form>
  );
};

export default PostEditForm;
