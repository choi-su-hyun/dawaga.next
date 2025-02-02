import Button from "@/components/common/Button/Button";
import DateInput from "@/components/common/Input/DateInput";
import TextInput from "@/components/common/Input/TextInput";
import Seo from "@/components/Seo";
import dayjs from "dayjs";
import Link from "next/link";
import { FieldErrors, useForm } from "react-hook-form";
// import KakaoMap from "@/components/KakaoMap";
import SearchMap, { IPlaceData } from "@/components/common/Modal/SearchMap";
import useModal from "@/hooks/useModal";
import ModalContainer from "@/components/common/Modal/ModalContainer";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@/assets/add.svg";

interface FormInput {
  title: string;
  date: string;
  time: string;
  address: string;
  addressDetail: string;
}

const MAP_CENTER = { lat: 37.5665, lng: 126.978 };

// ============================= 날짜 START =============================
const today = dayjs();
// ============================= 날짜 END =============================

const RegisterInvitePageBody: React.FC = ({}) => {
  const {
    handleSubmit,
    register,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      date: today.add(1, "day").format("YYYY-MM-DD"), // 초기값 설정
      time: "00:00", // 초기값 설정,
    },
  });
  const { openModal, closeModal } = useModal("SearchMap");

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

  // ============================= 지도 [START] =============================
  const [map, setMap] = useState<any>(null); // 지도 상태 저장
  const mapRef = useRef(null); // ref 선언

  const handlePlaceData = (placeData: IPlaceData) => {
    console.log(`placeData : `, placeData);
    if (placeData) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(placeData.y, placeData.x),
        map: map,
      });
      bounds.extend(marker.getPosition()); // 마커 위치를 bounds에 추가
      map?.setBounds(bounds); // 검색된 장소가 보이도록 지도 범위 조정
    }
    setValue("address", placeData.address_name);
    closeModal("SearchMap");
  };

  // 지도 초기화
  useEffect(() => {
    if (mapRef.current == null) {
      return;
    }
    const container = mapRef.current;
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng),
        level: 7,
      };
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap); // map 상태 업데이트
    });
  }, [mapRef]);
  // ============================= 지도 [END] =============================

  return (
    <>
      <Seo title="초대장 생성" />
      <section className="section section--shadow-type">
        <div className="section-container section-container--shadow-type">
          {/* ============================= 작성 폼 [START] ============================= */}
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
                <div className="address-input-wrap">
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
                  <Button
                    type="button"
                    variant="secondary-btn"
                    size="size-x-small"
                    onClick={() => openModal()}
                  >
                    주소 검색
                  </Button>
                </div>

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
            {/* ============================= 작성 폼 [END] ============================= */}

            {/* ============================= 카카오 지도 [START] ============================= */}
            <div
              className="kakao-map"
              ref={mapRef} // ref를 div에 연결
              style={{ width: "100%", height: "400px" }}
            ></div>
            {/* ============================= 카카오 지도 [END] ============================= */}

            {/* ============================= 참여 인원 [START] ============================= */}
            <div className="title-wrap--btn-wrap">
              <h4 className="title title--sm">모임 인원</h4>
              <Button
                type="button"
                variant="text-cta-btn"
                size="size-small"
                leftSlot={<AddIcon />}
              >
                추가
              </Button>
            </div>
            {/* ============================= 참여 인원 [END] ============================= */}

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

      <ModalContainer label="주소 검색" id="SearchMap" position="bottom">
        <SearchMap eventPlaceData={handlePlaceData} />
      </ModalContainer>
    </>
  );
};

export default RegisterInvitePageBody;
