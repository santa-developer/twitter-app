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
import useTranslation from "hooks/useTranslation";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const t = useTranslation();

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
        setError(t("ALERT_INVALID_EMAIL"));
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError(t("ALERT_PASSWORD_LENGTH"));
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
      toast.success(t("ALERT_LOGIN"));
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
        throw new Error(t("ALERT_UNSUPPORTED_LOGIN"));
      }

      await signInWithPopup(auth, provider);
      toast.success(t("ALERT_LOGIN"));
    } catch (error) {
      const errorMsg = (error as Error).message;
      toast.error(errorMsg);
    }
  };
  return (
    <form className='form form--lg' onSubmit={onsubmit}>
      <div className='form__title'>{t("MENU_LOGIN")}</div>
      <div className='form__block'>
        <label htmlFor='email'>{t("FORM_EMAIL")}</label>
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
        <label htmlFor='password'>{t("FORM_PASSWORD")}</label>
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
        {t("NO_ACCOUNT")}
        <Link to='/users/signup' className='form__link'>
          {t("MENU_SIGNUP")}
        </Link>
      </div>
      <div className='form__block--lg'>
        <button
          type='submit'
          className='form__btn--submit'
          disabled={error?.length > 0}
        >
          {t("MENU_LOGIN")}
        </button>
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='google'
          className='form__btn--google'
          onClick={handleSnsLogin}
        >
          {t("LOGIN_WITH_GOOGLE")}
        </button>
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='github'
          className='form__btn--github'
          onClick={handleSnsLogin}
        >
          {t("LOGIN_WITH_GITHUB")}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
