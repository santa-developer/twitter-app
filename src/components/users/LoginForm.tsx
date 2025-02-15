import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // 이벤트 변경 핸들러
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const emailRegEx =
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

      if (!value?.match(emailRegEx)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.");
      } else {
        setError("");
      }
    }
  };
  // 로그인 이벤트
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인이 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // sns 로그인 이벤트
  const handleSnsLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const target = e.target as HTMLButtonElement;
      const { name } = target;

      const auth = getAuth(app);
      let provider;

      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      } else {
        throw new Error("지원되지 않는 로그인입니다.");
      }

      await signInWithPopup(auth, provider);
      toast.success("로그인 하였습니다.");
    } catch (error) {
      const errorMsg = (error as Error).message;
      toast.error(errorMsg);
    }
  };
  return (
    <form className='form form--lg' onSubmit={onsubmit}>
      <div className='form__title'>로그인</div>
      <div className='form__block'>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          required
          onChange={onChange}
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          required
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className='form__block'>
          <div className='form__error'>{error}</div>
        </div>
      )}
      <div className='form__block'>
        계정이 없으신가요?
        <Link to='/users/signup' className='form__link'>
          회원가입
        </Link>
      </div>
      <div className='form__block--lg'>
        <button
          type='submit'
          className='form__btn--submit'
          disabled={error?.length > 0}
        >
          로그인
        </button>
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='google'
          className='form__btn--google'
          onClick={handleSnsLogin}
        >
          Google로 로그인
        </button>
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='github'
          className='form__btn--github'
          onClick={handleSnsLogin}
        >
          Github로 로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
