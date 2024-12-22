import { useState } from "react";
import "./App.css";

const mockupData = [
  { id: "1", title: "Something1", value: "Value1" },
  { id: "2", title: "Something2", value: "Value2" },
  { id: "3", title: "Something3", value: "Value3" },
  { id: "4", title: "Something4", value: "Value4" },
];
const ChildrenData = (props) => {
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(-1); // -1 - not sent, 0 - error, 1 - success
  const [status, setStatus] = useState("Do przetworzenia");
  const handleCheckboxChange = (e) => {
    setIsError(e.target.checked);
  };
  const handleButtonClick = async () => {
    props.onSendData({
      id: props.id,
      title: props.title,
      value: props.value,
      isError,
      setIsSent,
      setStatus,
    });
  };
  const getStatusIcon = () => {
    if (isSent === 1) {
      return "🟢";
    } else if (isSent === 0) {
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
        <h3>{getStatusIcon() + " " + status}</h3>
      </td>
      <td>
        <button onClick={handleButtonClick}>Click me</button>
      </td>
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

    console.log("Response from API:", result);
    children.setStatus(result.title);
    if (result.status !== 200) {
      alert(result.title + " dla " + children.title);
      children.setIsSent(0);
    } else children.setIsSent(1);
  } catch (error) {
    console.error("Error sending data to API:", error);
    children.setStatus("Error sending data to API:" + error);
    children.setIsSent(0);
  } finally {
    console.log("Data sent to API");
  }
};
const ChildrenDataElements = mockupData.map((data) => (
  <ChildrenData
    key={data.id}
    id={data.id}
    title={data.title}
    value={data.value}
    onSendData={sendDataToApi}
  />
));

function App() {
  return (
    <>
      <h1>Zadanie rekrutacyjne</h1>
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
            <th>
              <h2>Przycisk</h2>
            </th>
            <th>
              <h2>Symulacja błędu</h2>
            </th>
          </tr>
        </thead>
        <tbody>{ChildrenDataElements}</tbody>
      </table>
    </>
  );
}

export default App;
