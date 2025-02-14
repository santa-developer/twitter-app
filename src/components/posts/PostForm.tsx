import { FiImage } from "react-icons/fi";

const PostForm = () => {
  // 이미지 업로드 이벤트
  const handleFileUpload = () => {};
  return (
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
        <input type='submit' value='Tweet' className='post-form__submit-btn' />
      </div>
    </form>
  );
};

export default PostForm;
