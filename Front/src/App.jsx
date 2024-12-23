import { useState } from "react";
import "./App.css";

const mockupData = [
  { id: "1", title: "Something1", value: "Value1" },
  { id: "2", title: "Something2", value: "Value2" },
  { id: "3", title: "Something3", value: "Value3" },
  { id: "4", title: "Something4", value: "Value4" },
  { id: "5", title: "Something5", value: "Value5" },
  { id: "6", title: "Something6", value: "Value6" },
];

const ChildrenData = (props) => {
  const [isError, setIsError] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsError(checked);
    props.onCheckboxChange(props.id, checked);
  };
  //Wykomentowanie tej funkcji, ponieważ nie jest już używana
  // const handleButtonClick = async () => {
  //   await props.onSendData({
  //     id: props.id,
  //     title: props.title,
  //     value: props.value,
  //     isError,
  //     onChangeStatus: props.onChangeStatus,
  //   });
  // };
  const getStatusIcon = () => {
    if (props.isSent === 1) {
      return "🟢";
    } else if (props.isSent === 0) {
      return "🔴";
    } else {
      return "🟡";
    }
  };
  return (
    <tr>
      <td>
        <h3>{props.title}</h3>
      </td>
      <td>
        <h3>{props.value}</h3>
      </td>
      <td>
        <h3>{getStatusIcon() + " " + props.status}</h3>
      </td>
      {/* Wykomentowanie przycisku, ponieważ nie jest już używany
          <td>
        <button onClick={handleButtonClick}>Click me</button>
      </td> */}
      <td>
        <input
          type="checkbox"
          checked={isError}
          onChange={handleCheckboxChange}
        />
      </td>
    </tr>
  );
};
const sendDataToApi = async (children) => {
  try {
    const response = await fetch(
      "https://koskoaliktest-gugaenbrgwb7cfdf.polandcentral-01.azurewebsites.net/api/Test",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          childrenid: children.id,
          title: children.title,
          value: children.value,
          isok: children.isError ? "0" : "1",
        }),
      }
    );
    const result = await response.json();
    if (result.status !== 200) {
      alert(result.title + " dla " + children.title);
    }
    //console.log("Response from API:", result);
    children.onChangeStatus(
      children.id,
      result.title,
      result.status === 200 ? 1 : 0
    );
    return result;
  } catch (error) {
    //console.error("Error sending data to API:", error);
    children.onChangeStatus(
      children.id,
      "Błąd wysyłki danych do API " + error,
      0
    );
  } finally {
    //console.log("Data sent to API");
  }
};

function App() {
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

  return (
    <>
      <h1>Zadanie rekrutacyjne</h1>
      <button onClick={handleButtonClick}>Wyślij wszystko</button>
      <table>
        <thead>
          <tr>
            <th>
              <h2>Tytuł</h2>
            </th>
            <th>
              <h2>Wartość</h2>
            </th>
            <th>
              <h2>Status</h2>
            </th>
            {/* Wykomentowanie nagłówka, ponieważ nie jest już używany
            <th>
              <h2>Przycisk</h2>
            </th> */}
            <th>
              <h2>Symulacja błędu</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {mockupData.map((data) => {
            const { status, isSent } = statusList.find((s) => s.id === data.id);
            return (
              <ChildrenData
                key={data.id}
                id={data.id}
                title={data.title}
                value={data.value}
                status={status}
                isSent={isSent}
                onCheckboxChange={handleCheckboxChange}
                onSendData={sendDataToApi}
                onChangeStatus={handleChangeStatus}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
