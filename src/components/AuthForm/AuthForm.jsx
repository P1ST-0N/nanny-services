import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton.jsx";
import Icon from "../Icon/Icon.jsx";

import authOperations from "../../redux/auth/operations.js";
import authSelectors from "../../redux/auth/selectors.js";
import schemas from "../../schemas";
import css from "./AuthForm.module.css";

const signUpDefaultValues = () => ({
  name: "",
  email: "",
  password: "",
});

const logInDefaultValues = () => ({
  email: "",
  password: "",
});

function AuthForm({ logIn = false, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    logIn
      ? {
          defaultValues: logInDefaultValues(),
          resolver: yupResolver(schemas.logIn),
        }
      : {
          defaultValues: signUpDefaultValues(),
          resolver: yupResolver(schemas.signUp),
        }
  );

  const [showPass, setShowPass] = useState(false);
  const isLogged = useSelector(authSelectors.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) onClose(false);
  }, [isLogged, onClose]);

  const onSubmit = (data) => {
    dispatch(
      logIn ? authOperations.login(data) : authOperations.register(data)
    );
  };

  return (
    <>
      <CloseButton onClick={() => onClose(false)} />
      <h2 className={css.heading}>{logIn ? "Log In" : "Registration"}</h2>
      <p className={css.text}>
        {logIn
          ? "Welcome back! Please enter your credentials to access your account and continue your babysitter search."
          : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."}
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        {!logIn && (
          <div className={css.inputWrapper}>
            <input
              {...register("name")}
              className={css.input}
              type="text"
              placeholder="Name"
            />
            {errors.name && (
              <p className={css.errorText}>{`*${errors.name.message}`}</p>
            )}
          </div>
        )}
        <div className={css.inputWrapper}>
          <input
            {...register("email")}
            className={css.input}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <p className={css.errorText}>{`*${errors.email.message}`}</p>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            {...register("password")}
            className={css.input}
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          {errors.password && (
            <p className={css.errorText}>{`*${errors.password.message}`}</p>
          )}
          <button
            type="button"
            className={css.passButton}
            onClick={() => setShowPass(!showPass)}
          >
            <Icon name={showPass ? "eye-off" : "eye"} width={20} height={20} />
          </button>
        </div>
        <Button type="submit" className={css.button} filled={true}>
          {logIn ? "Log In" : "Sign Up"}
        </Button>
      </form>
    </>
  );
}

export default AuthForm;
