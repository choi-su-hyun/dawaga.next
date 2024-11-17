// "use client";

import { NextPage } from "next";
import LogoAndName from "@/assets/logoAndName.svg";
import TextInput from "@/components/common/Input/TextInput";
import { useForm, FieldErrors } from "react-hook-form";
import Button from "@/components/common/Button/Button";
import {
  VALID_EN_NUM_REGEX,
  VALID_BIG_EN_EN_NUM_REGEX,
} from "@/utils/inputTextLimit";
import Link from "next/link";
import Seo from "@/components/Seo";
// interface Props {}
interface FormInput {
  id: string;
  password: string;
}

const SignIn: NextPage = ({}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormInput>();

  const onValid = (data: FormInput) => {
    // TODO : API 보낼 때 에러 텍스트 관련해서 유의하자
    clearErrors();
    console.log(`data : `, data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(`errors : `, errors);
  };

  return (
    <>
      <Seo title="로그인" />
      <section className="section">
        <div className="section-container">
          <form
            className="form form-space-gap--sm"
            onSubmit={handleSubmit(onValid, onInValid)}
          >
            <div className="form-input-wrap">
              <div className="center-box">
                <LogoAndName />
              </div>
              <TextInput
                register={register("id", {
                  required: { value: true, message: "아이디를 입력해주세요." },
                  maxLength: 8,
                  pattern: {
                    value: VALID_EN_NUM_REGEX,
                    message: "한글은 작성할 수 없습니다.",
                  },
                })}
                type="text"
                label="아이디"
                name="id"
                placeholder="아이디를 입력해주세요"
                errorText={errors.id?.message}
              />
              <TextInput
                register={register("password", {
                  required: { value: true, message: "비밀번호를 입력해주세요" },
                  maxLength: 8,
                  pattern: {
                    value: VALID_BIG_EN_EN_NUM_REGEX,
                    message:
                      "비밀번호는 영어(대문자 포함), 숫자, 특수문자를 적어도 하나씩 포함되어야합니다.",
                  },
                })}
                type="password"
                label="비밀번호"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                errorText={errors.password?.message}
              />
            </div>
            <div className="btn-wrap btn-wrap--column">
              <Button
                variant="cta-btn"
                size="size-small"
                type="submit"
                isFullWidth
              >
                로그인 하기
              </Button>
              <Link href="/sign-up">
                <Button variant="text-center" type="submit" isFullWidth>
                  회원가입 하러 가기
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
