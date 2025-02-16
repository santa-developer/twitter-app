import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const PostForm = () => {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, sethashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isImageSubmitting, setIsImageSubmitting] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  // 이미지 업로드 이벤트
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일을 가져옴

    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
      const fileReaderTarget = e.currentTarget as FileReader; // 타입 단언
      const fileData = fileReaderTarget.result as string; // result는 string | ArrayBuffer | null
      setImageFile(fileData);
    };
  };

  // 이미지 삭제 이벤트
  const handleDeleteImg = () => {
    setImageFile(null);
  };

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
    setIsImageSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    e.preventDefault();
    try {
      // 이미지 먼저 업로드
      let imageUrl = "";
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageUrl = await getDownloadURL(data?.ref);
      }

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
        imageUrl: imageUrl, // 업로드 된 이미지의 download url 업데이트
      });
      setContent("");
      setTags([]);
      sethashTag("");
      toast.success("게시글이 등록되었습니다.");
      setImageFile(null);
      setIsImageSubmitting(false);
    } catch (e) {
      toast.error("게시글 등록 중에 문제가 발생했습니다.");
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
        <div className='post-form__image-area'>
          {/* htmlFor='file-input' */}
          <label htmlFor='file-input' className='post-form__file'>
            <FiImage className='post-form__file-icon' />
          </label>
          <input
            type='file'
            name='file-input'
            id='file-input'
            accept='image/*'
            onChange={handleFileUpload}
            className='hidden'
          />
          {imageFile && (
            <div className='post-form__attachment'>
              <img
                src={imageFile}
                alt='attachment'
                width={200}
                height={"auto"}
              />
              <button
                className='post-form__clear-btn'
                type='button'
                onClick={handleDeleteImg}
              >
                X
              </button>
            </div>
          )}
        </div>

        <input
          type='submit'
          value='Tweet'
          className='post-form__submit-btn'
          disabled={isImageSubmitting}
        />
        {/* disabled={isImageSubmitting} 이미지가 업로드 중일 때는 비활성화 (여러번 등록되는 것을 방지하기 위함) */}
      </div>
    </form>
  );
};

export default PostForm;
