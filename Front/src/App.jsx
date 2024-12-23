import "./App.css";
import { mockupData } from "./data/mockupData";
import { useAppState } from "./hooks/useAppState";
import Table from "./components/Table";

function App() {
  const { statusList, handleCheckboxChange, handleButtonClick } = useAppState();

  return (
    <>
      <h1>Zadanie rekrutacyjne</h1>
      <button onClick={handleButtonClick}>Wyślij wszystko</button>
      <Table
        mockupData={mockupData}
        statusList={statusList}
        handleCheckboxChange={handleCheckboxChange}
      />
    </>
  );
}

export default App;
