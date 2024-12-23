import { useState } from "react";

export const ChildrenData = (props) => {
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
