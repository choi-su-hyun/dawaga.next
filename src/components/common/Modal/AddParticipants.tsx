import React from "react";
import SearchInput from "../Input/SearchInput";
import { useForm } from "react-hook-form";

const AddParticipants = () => {
  const { register } = useForm<{ participantsSearch: string }>({
    defaultValues: {
      participantsSearch: "",
    },
  });

  const searchParticipants = () => {
    console.log("참여자 검색 api");
  };

  return (
    <>
      <SearchInput
        register={register("participantsSearch")}
        name="participants-search"
        searchAction={searchParticipants}
      />
    </>
  );
};

export default AddParticipants;
