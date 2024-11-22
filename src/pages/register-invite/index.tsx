import Button from "@/components/common/Button/Button";
import DateInput from "@/components/common/Input/DateInput";
import TextInput from "@/components/common/Input/TextInput";
import Seo from "@/components/Seo";
import dayjs from "dayjs";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FieldErrors, useForm } from "react-hook-form";

interface Props {
  d: string;
}
interface FormInput {
  title: string;
  date: string;
  time: string;
  postCode: string;
  address: string;
  addressDetail: string;
}

// ============================= 날짜 START =============================
const today = dayjs();
// ============================= 날짜 END =============================

const RegisterInvite: NextPage<Props> = ({}) => {
  const {
    handleSubmit,
    register,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      date: today.add(1, "day").format("YY-MM-DD"), // 초기값 설정
      time: today.format("HH:mm"), // 초기값 설정
    },
  });

  const router = useRouter();

  const onValid = (data: FormInput) => {
    // TODO : API 보낼 때 에러 텍스트 관련해서 유의하자
    clearErrors();
    console.log(`data : `, data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(`errors : `, errors);
  };

  const dateValue = watch("date");
  const timeValue = watch("time");

  return (
    <>
      <Seo title="초대장 생성" />
      <section className="section section--shadow-type">
        <div className="section-container section-container--shadow-type">
          <form
            className="form form-space-gap--sm"
            onSubmit={handleSubmit(onValid, onInValid)}
          >
            <div className="form-input-wrap">
              <TextInput
                register={register("title", {
                  required: { value: true, message: "제목을 입력해주세요." },
                  maxLength: 8,
                })}
                type="text"
                label="제목"
                name="title"
                placeholder="제목을 입력해주세요"
                errorText={errors.title?.message}
              />
              <DateInput
                label="약속날짜"
                dateRegister={register("date", {
                  required: { value: true, message: "제목을 입력해주세요." },
                  maxLength: 8,
                })}
                dateValue={dateValue}
                dateName="date"
                datePlaceholder="0000-00-00"
                dateErrorText={errors.date?.message}
                timeRegister={register("time", {
                  required: { value: true, message: "제목을 입력해주세요." },
                  maxLength: 8,
                })}
                timeValue={timeValue}
                timeName="time"
                timePlaceholder="00:00"
                timeErrorText={errors.time?.message}
              />

              <div className="address-wrap">
                {/* 우편번호 */}
                <div className="address-input-wrap">
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
                    onClick={() => router.push("?modal=true")}
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
            <div className="btn-wrap btn-wrap--row">
              <Button size="size-small" type="button">
                취소
              </Button>
              <Link href="/sign-up" className="link-btn">
                <Button variant="cta-btn" size="size-small" isFullWidth>
                  약속 만들기
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterInvite;
