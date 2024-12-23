import { ChildrenData } from "./ChildrenData";
//import { sendDataToApi } from "./services/api"; //Wykomentowanie importu, ponieważ nie jest już używany

const Table = ({ mockupData, statusList, handleCheckboxChange }) => {
  return (
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
              //onSendData={sendDataToApi} //Wykomentowanie przekazywania funkcji, ponieważ nie jest już używana
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
