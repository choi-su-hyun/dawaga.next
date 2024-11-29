import { NextPage } from "next";
import style from "./Input.module.scss";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import SearchIcon from "@/assets/search.svg";
import Button from "../Button/Button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errorText?: string;
  successText?: string;
  register: UseFormRegisterReturn;
  searchAction: () => void;
}

const SearchInput: NextPage<Props> = ({
  name,
  label,
  errorText,
  successText,
  register,
  searchAction,
  ...rest
}) => {
  return (
    <div className={style["text-input"]}>
      <label htmlFor={name}>{label}</label>
      <div className={style["text-input-wrap"]}>
        <input {...register} {...rest} />
        <Button
          variant="icon-btn"
          size={"icon-btn-size"}
          onClick={searchAction}
        >
          <SearchIcon />
        </Button>
      </div>

      {errorText && (
        <span className={style["text-input__error-text"]}>{errorText}</span>
      )}
      {successText && (
        <span className={style["text-input__success-text"]}>{successText}</span>
      )}
    </div>
  );
};

export default SearchInput;
