import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
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
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password_confirm") {
      setPasswordConfirm(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.");
      } else if (value !== password) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
      }
    }
  };
  // 회원가입 이벤트
  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form className='form form--lg' onSubmit={onsubmit}>
      <div className='form__title'>회원가입</div>
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
      <div className='form__block'>
        <label htmlFor='password_confirm'>비밀번호 확인</label>
        <input
          type='password'
          name='password_confirm'
          id='password_confirm'
          value={passwordConfirm}
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
        계정이 있으신가요?
        <Link to='/users/login' className='form__link'>
          로그인
        </Link>
      </div>
      <div className='form__block'>
        <button
          type='submit'
          className='form__btn-submit'
          disabled={error?.length > 0}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
