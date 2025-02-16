import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";

const PostForm = () => {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, sethashTag] = useState<string>("");
  const { user } = useContext(AuthContext);
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

  // 폼 제출 이벤트
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });
      setContent("");
      setTags([]);
      sethashTag("");
      toast.success("게시글이 등록되었습니다.");
    } catch (e) {}
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
        <input type='submit' value='Tweet' className='post-form__submit-btn' />
      </div>
    </form>
  );
};

export default PostForm;
