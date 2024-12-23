import { useState } from "react";
import { sendDataToApi } from "../services/api";
import { mockupData } from "../data/mockupData";

export const useAppState = () => {
  const [statusList, setStatusList] = useState(
    mockupData.map((data) => ({
      id: data.id,
      status: "Do przetworzenia",
      isSent: -1, // -1 - not sent, 0 - error, 1 - success
      isError: false,
    }))
  );
  const handleCheckboxChange = (id, isChecked) => {
    setStatusList((prevStatusList) =>
      prevStatusList.map((status) =>
        status.id === id ? { ...status, isError: isChecked } : status
      )
    );
  };
  const handleButtonClick = async () => {
    for (const record of mockupData) {
      const recordStatus = statusList.find((status) => status.id === record.id);
      const allRecordsSent = statusList.every((status) => status.isSent === 1);
      if (allRecordsSent) {
        alert("Wszystko zostało już wysłane!");
        return;
      }
      if (recordStatus && recordStatus.isSent !== 1) {
        const response = await sendDataToApi({
          id: record.id,
          title: record.title,
          value: record.value,
          isError: recordStatus.isError,
          onChangeStatus: handleChangeStatus,
        });
        console.log("Response from API:", response);
        if (response.status !== 200) {
          return;
        }
      }
    }
  };

  const handleChangeStatus = (id, newStatus, newIsSent) => {
    setStatusList((prevStatusList) =>
      prevStatusList.map((status) =>
        status.id === id
          ? { ...status, status: newStatus, isSent: newIsSent }
          : status
      )
    );
  };
  return { statusList, handleCheckboxChange, handleButtonClick };
};
