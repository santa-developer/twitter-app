import BackBtn from "components/posts/BackBtn";
import AuthContext from "context/AuthContext";
import { updateProfile } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";

const ProfileEdit = () => {
  const [displayName, setDisplayName] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 입력 값 변경 이벤트
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    if (name === "displayName") {
      setDisplayName(value);
    }
  };

  // 파일 이미지 업로드 이벤트
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일을 가져옴

    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
      const fileReaderTarget = e.currentTarget as FileReader; // 타입 단언
      const fileData = fileReaderTarget.result as string; // result는 string | ArrayBuffer | null
      setImageUrl(fileData);
    };
  };

  // 이미지 삭제 이벤트
  const handleDeleteImg = () => {
    setImageUrl(null);
  };

  // 프로필 수정 이벤트
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    let newImageUrl = null;

    e.preventDefault();
    try {
      //기존 유저 이미지가 firebase storage 이미지일 경우에만 삭제
      if (
        user?.photoURL &&
        user?.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)
      ) {
        const imageRef = ref(storage, user?.photoURL);
        if (imageRef) {
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }
      }
      // 이미지 업로드
      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, "data_url");
        newImageUrl = await getDownloadURL(data?.ref);
      }
      // updateProfile 호출
      if (user) {
        await updateProfile(user, {
          displayName: displayName || "",
          photoURL: newImageUrl || "",
        })
          .then(() => {
            toast.success("프로필이 수정되었습니다.");
            navigate("/profile");
          })
          .catch((error) => {
            toast.error("프로필 수정에 실패했습니다.");
          });
      }
    } catch (e) {
      toast.error("프로필 수정 중 에러가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
    }

    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user?.photoURL, user?.displayName]);
  return (
    <div className='post'>
      <BackBtn />
      <form className='post-form' onSubmit={onSubmit}>
        <div className='post-form__profile'>
          <input
            type='text'
            name='displayName'
            className='post-form__input'
            placeholder='이름'
            value={displayName}
            onChange={onChange}
          />
          {imageUrl && (
            <div className='post-form__attachment'>
              <img
                src={imageUrl}
                alt='attachment'
                width={140}
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
          <div className='post-form__submit-area'>
            <div className='post-form__image-area'>
              <label htmlFor='file-input' className='post-form__file'>
                <FiImage className='post-form__file-icon' />
              </label>
            </div>
            <input
              type='file'
              name='file-input'
              id='file-input'
              accept='image/*'
              onChange={handleFileUpload}
              className='hidden'
            />
            <input
              type='submit'
              value='프로필 수정'
              className='post-form__submit-btn'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
