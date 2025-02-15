import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";

const PostForm = () => {
  const [content, setContent] = useState<string>("");
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
      });
      setContent("");
      toast.success("게시글이 등록되었습니다.");
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
        <input type='submit' value='Tweet' className='post-form__submit-btn' />
      </div>
    </form>
  );
};

export default PostForm;
