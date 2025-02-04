import React from "react";
import DeleteItem from "@/assets/deleteItem.svg";
import Button from "../Button/Button";
import UserFullback from "@/assets/userFullback.svg";
import style from "./ParticipantsItem.module.scss";

const ParticipantsItem = () => {
  return (
    <>
      <div className={style["participants-item"]}>
        <div className={style["text-wrap"]}>
          {/* <img src="" alt="" /> */}
          <UserFullback />
          <h4>참여자</h4>
        </div>

        <Button type="button" variant="icon-btn">
          <DeleteItem />
        </Button>
      </div>
    </>
  );
};

export default ParticipantsItem;
