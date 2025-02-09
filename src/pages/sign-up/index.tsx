import { NextPage } from "next";
import style from "./SignUp.module.scss";
import TextInput from "@/components/common/Input/TextInput";
import { FieldErrors, useForm } from "react-hook-form";
import {
  VALID_BIG_EN_EN_NUM_REGEX,
  VALID_EN_NUM_REGEX,
} from "@/utils/inputTextLimit";
import Link from "next/link";
import Button from "@/components/common/Button/Button";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import ModalContainer from "@/components/common/Modal/ModalContainer";
import useModal from "@/hooks/useModal";
// import { getStaticPaths } from "next/dist/build/templates/pages";

interface Props {
  searchParams: {
    modal: string;
  };
}

interface FormInput {
  id: string;
  name: string;
  nickName: string;
  password: string;
  passwordCheck: string;
  postCode: string;
  address: string;
  addressDetail: string;
}

// export const getStaticPaths: GetStaticPaths = () => {

// };

const SignUp: NextPage<Props> = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  console.log(`router : `, router.query);

  const onValid = (data: FormInput) => {
    // TODO : API 보낼 때 에러 텍스트 관련해서 유의하자
    clearErrors();
    console.log(`data : `, data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(`errors : `, errors);
  };

  const handleAddressComplete = (data: Address) => {
    console.log(`data : `, data);
    setValue("postCode", data.zonecode);
    setValue("address", data.address);
    closeModal("DaumPostCode");
  };

  return (
    <>
      <Seo title="회원가입" />
      <section className={style["sign-up-section"]}>
        <div className="section-container">
          <form
            className="form form-space-gap--md"
            onSubmit={handleSubmit(onValid, onInValid)}
          >
            <div>
              <div className={style["title-wrap"]}>
                <h2>회원 정보 입력</h2>
                <p>회원가입을 위해 개인정보를 입력해주세요.</p>
              </div>
              <div className="form-input-wrap">
                {/* 아이디 */}
                <TextInput
                  register={register("id", {
                    required: {
                      value: true,
                      message: "아이디를 입력해주세요.",
                    },
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

                {/* 이름 */}
                <TextInput
                  register={register("name", {
                    required: {
                      value: true,
                      message: "이름을 입력해주세요.",
                    },
                    maxLength: 8,
                    pattern: {
                      value: VALID_EN_NUM_REGEX,
                      message: "한글은 작성할 수 없습니다.",
                    },
                  })}
                  type="text"
                  label="이름"
                  name="name"
                  placeholder="이름을 입력해주세요"
                  errorText={errors.name?.message}
                />

                {/* 닉네임 */}
                <TextInput
                  register={register("nickName", {
                    required: {
                      value: true,
                      message: "닉네임을 입력해주세요.",
                    },
                    maxLength: 8,
                    pattern: {
                      value: VALID_EN_NUM_REGEX,
                      message: "한글은 작성할 수 없습니다.",
                    },
                  })}
                  type="text"
                  label="닉네임"
                  name="nickName"
                  placeholder="닉네임을 입력해주세요"
                  errorText={errors.nickName?.message}
                />

                {/* 비밀번호 */}
                <TextInput
                  register={register("password", {
                    required: {
                      value: true,
                      message: "비밀번호를 입력해주세요",
                    },
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

                {/* 비밀번호 확인 */}
                <TextInput
                  register={register("passwordCheck", {
                    required: {
                      value: true,
                      message: "비밀번호 확인을 위해 다시 한 번 입력해주세요",
                    },
                    maxLength: 8,
                    pattern: {
                      value: VALID_BIG_EN_EN_NUM_REGEX,
                      message:
                        "비밀번호는 영어(대문자 포함), 숫자, 특수문자를 적어도 하나씩 포함되어야합니다.",
                    },
                  })}
                  type="password"
                  label="비밀번호 확인"
                  name="passwordCheck"
                  placeholder="비밀번호 확인을 위해 다시 한 번 입력해주세요"
                  errorText={errors.passwordCheck?.message}
                />

                <div className="address-wrap">
                  <div className="address-input-wrap">
                    {/* 우편번호 */}
                    <TextInput
                      register={register("postCode", {
                        required: {
                          value: true,
                          message: "주소 검색을 통해 주소를 입력해주세요",
                        },
                      })}
                      type="text"
                      label="주소"
                      name="postCode"
                      placeholder="우편번호"
                      disabled
                      errorText={errors.postCode?.message}
                    />
                    <Button
                      type="button"
                      variant="secondary-btn"
                      size="size-x-small"
                      onClick={() => openModal("DaumPostCode")}
                    >
                      주소 검색
                    </Button>
                  </div>

                  {/* 주소 */}
                  <TextInput
                    register={register("address", {
                      required: {
                        value: true,
                        message: "주소 검색을 통해 주소를 입력해주세요",
                      },
                    })}
                    type="text"
                    name="address"
                    placeholder="주소"
                    errorText={errors.address?.message}
                  />

                  {/* 상세 주소 */}
                  <TextInput
                    register={register("addressDetail", {
                      required: {
                        value: true,
                        message: "상세 주소를 입력해주세요",
                      },
                    })}
                    type="text"
                    name="addressDetail"
                    placeholder="상세 주소"
                    errorText={errors.addressDetail?.message}
                  />
                </div>
              </div>
            </div>
            <div className="btn-wrap btn-wrap--column">
              <Button
                variant="cta-btn"
                size="size-small"
                type="submit"
                isFullWidth
              >
                회원가입
              </Button>
              <Link href="/">
                <Button variant="text-center" type="submit" isFullWidth>
                  홈으로 가기
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* ============================= 주소 검색 모달 [START] ============================= */}
      <ModalContainer label="주소 검색" id="DaumPostCode" position="bottom">
        <DaumPostcodeEmbed
          onComplete={handleAddressComplete}
          style={{ height: "600px" }}
        />
      </ModalContainer>
      {/* ============================= 주소 검색 모달 [END] ============================= */}
    </>
  );
};

export default SignUp;
