import Button from "@/components/common/Button/Button";
import TextInput from "@/components/common/Input/TextInput";
import Seo from "@/components/Seo";
import { NextPage } from "next";
import Link from "next/link";
import { FieldErrors, useForm } from "react-hook-form";

interface Props {
  d: string;
}
interface FormInput {
  title: string;
}

const RegisterInvite: NextPage<Props> = ({}) => {
  const {
    handleSubmit,
    register,
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
