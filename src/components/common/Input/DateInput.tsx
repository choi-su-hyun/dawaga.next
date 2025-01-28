import { NextPage } from "next";
import style from "./Input.module.scss";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Calendar from "@/assets/calendar.svg";
import Clock from "@/assets/clock.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // 날짜
  dateName: string;
  dateErrorText?: string;
  dateSuccessText?: string;
  dateRegister?: UseFormRegisterReturn;
  datePlaceholder?: string;
  dateValue: string;
  // 시간
  timeName?: string;
  timeErrorText?: string;
  timeSuccessText?: string;
  timeRegister?: UseFormRegisterReturn;
  timePlaceholder?: string;
  timeValue?: string;
}

const DateInput: NextPage<Props> = ({
  dateName,
  label,
  dateErrorText,
  dateSuccessText,
  dateRegister,
  datePlaceholder,
  dateValue,
  timeName,
  timeErrorText,
  timeSuccessText,
  timeRegister,
  timePlaceholder,
  timeValue,
  ...rest
}) => {
  const handleFocus = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.showPicker(); // 날짜 선택기 열기
  };

  return (
    <div className={style["text-input"]}>
      <label htmlFor={dateName}>{label}</label>
      <div
        className={
          timeRegister
            ? [style["text-input-wrap"], style["column2"]].join(" ")
            : style["text-input-wrap"]
        }
      >
        {/* ============================= 날짜 date picker START ============================= */}
        {dateRegister && (
          <div className={style["column2-input-wrap"]}>
            <input
              {...dateRegister}
              placeholder={datePlaceholder}
              id={dateName}
              type="date"
              onClick={handleFocus}
              {...rest}
            />
            <div className={style["column2-input"]}>
              <label htmlFor={dateName}>{dateValue}</label>
              <Calendar />
            </div>
            {dateErrorText && (
              <span className={style["text-input__error-text"]}>
                {dateErrorText}
              </span>
            )}
            {dateSuccessText && (
              <span className={style["text-input__success-text"]}>
                {dateSuccessText}
              </span>
            )}
          </div>
        )}
        {/* ============================= 날짜 date picker END ============================= */}

        {/* ============================= 시간 date picker START ============================= */}
        {timeRegister && (
          <div className={style["column2-input-wrap"]}>
            <input
              {...timeRegister}
              placeholder={timePlaceholder}
              type="time"
              id={timeName}
              onClick={handleFocus}
              {...rest}
            />
            <div className={style["column2-input"]}>
              <label htmlFor={timeName}>{timeValue}</label>
              <Clock />
            </div>
            {timeErrorText && (
              <span className={style["text-input__error-text"]}>
                {timeErrorText}
              </span>
            )}
            {timeSuccessText && (
              <span className={style["text-input__success-text"]}>
                {timeSuccessText}
              </span>
            )}
          </div>
        )}
        {/* ============================= 시간 date picker END ============================= */}
      </div>
    </div>
  );
};

export default DateInput;
