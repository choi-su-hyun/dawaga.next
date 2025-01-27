import { NextPage } from "next";
import style from "./Input.module.scss";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import SearchIcon from "@/assets/search.svg";
// import LocationIcon from "@/assets/location.svg";
import Button from "../Button/Button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  errorText?: string;
  successText?: string;
  register: UseFormRegisterReturn;
  searchAction: () => void;
  isKeyDownEnter?: boolean;
  dropDownList?: [];
  clickDropDownItem?: () => void;
  heightFixed?: boolean;
}

const SearchInput: NextPage<Props> = ({
  name,
  label,
  errorText,
  successText,
  register,
  searchAction,
  isKeyDownEnter,
  dropDownList,
  heightFixed,
  clickDropDownItem,
  ...rest
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isKeyDownEnter && e.key === "Enter") {
      searchAction();
    }
  };
  return (
    <>
      <div className={style["search-input"]}>
        <div className={style["text-input"]}>
          <label htmlFor={name}>{label}</label>
          <div className={style["text-input-wrap"]}>
            <input {...register} {...rest} onKeyDown={handleKeyDown} />
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
            <span className={style["text-input__success-text"]}>
              {successText}
            </span>
          )}
        </div>
        {dropDownList?.length !== 0 && (
          <div
            className={`${style["search-input__drop-down"]} ${
              heightFixed
                ? style["search-input__drop-down-wrap--height-fixed"]
                : style["search-input__drop-down-wrap"]
            }`}
          >
            {dropDownList?.map((item, index) => {
              return (
                <button
                  className={style["search-input__drop-down-item"]}
                  key={index}
                  onClick={
                    clickDropDownItem ? () => clickDropDownItem() : () => {}
                  }
                >
                  {/* <div className={style["location-title"]}>
                    <LocationIcon />
                    <span>{item.place_name}</span>
                  </div>
                  <span className={style["location-description"]}>
                    {item?.address_name}
                  </span> */}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
