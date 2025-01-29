import React, { useState } from "react";
import SearchInput from "../Input/SearchInput";
import { useForm } from "react-hook-form";
// import { Map, MapMarker } from "react-kakao-maps-sdk";
import LocationIcon from "@/assets/location.svg";
import style from "./Modal.module.scss";

export interface IPlaceData {
  [key: string]: string;
}

interface IProps {
  eventPlaceData: (placeData: IPlaceData) => void;
}

const SearchMap = ({ eventPlaceData }: IProps) => {
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  // ============================= 지도 START =============================
  const [places, setPlaces] = useState<IPlaceData[]>([]); // 검색된 장소 저장
  const searchTerm = watch("search");

  const searchPlaces = () => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchTerm, (data: IPlaceData[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data); // 검색된 장소 데이터 저장
      } else {
        console.error("장소 검색 실패:", status);
      }
    });
  };

  const clickedSearchedData = (data: IPlaceData) => {
    eventPlaceData(data);
  };
  // ============================= 지도 END =============================

  return (
    <>
      <div className="section-container--gap-md section-container--full-height">
        <SearchInput
          register={register("search")}
          value={searchTerm}
          name={"search"}
          placeholder="검색어를 입력하세요"
          searchAction={searchPlaces}
          isKeyDownEnter
          heightFixed
        />
        <div className={`${style["location-list__wrap"]}`}>
          {places.length !== 0 && (
            <div className={`${style["location-list"]}`}>
              <div
                className={`${style["location-list__drop-down"]} ${style["location-list__drop-down-wrap"]}`}
              >
                {places?.map((item, index) => {
                  return (
                    <button
                      className={style["location-list__drop-down-item"]}
                      key={index}
                      onClick={() => clickedSearchedData(item)}
                    >
                      <div className={style["location-title"]}>
                        <LocationIcon />
                        <span>{item.place_name}</span>
                      </div>
                      <span className={style["location-description"]}>
                        {item?.address_name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {places.length === 0 && (
            <div className="message-box">
              <span>검색된 데이터가 없습니다.</span>
              <span>(주소를 검색해주세요)</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchMap;
