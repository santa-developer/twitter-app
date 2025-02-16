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
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, sethashTag] = useState<string>("");
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
      setTags(docSnap.data()?.hashTags);
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
      if (!post?.id) {
        toast.error("게시글 정보를 찾을 수 없습니다.");
        return;
      }

      const isContentChanged = post.content !== content;
      const isTagsChanged =
        JSON.stringify(post.hashTags) !== JSON.stringify(tags); // 해시태그 배열 비교

      if (isContentChanged || isTagsChanged) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, { content, hashTags: tags });
        toast.success("게시글이 수정되었습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        toast.info("수정된 내용이 없습니다.");
      }
    } catch (error) {
      toast.error("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  // keyup 이벤트
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      //태그를 생성해 주는데 같은 태그가 있다면 에러를 띄운다.
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("동일한 태그가 존재합니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        sethashTag("");
      }
    }
  };

  // 해시태그 입력 핸들링
  const onChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    sethashTag(e.target.value.trim());
  };

  // 해시태그 삭제 이벤트
  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
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
      <div className='post-form__hashtags'>
        <span className='post-form__hashtags-outputs'>
          {tags?.map((tag, idx) => (
            <span
              className='post-form__hashtags-tag'
              key={idx}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>
        <input
          type='text'
          name='hashtag'
          id='hashtag'
          placeholder='해시태그 + 스페이스바 입력'
          className='post-form__input'
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
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
