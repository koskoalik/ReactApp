export const sendDataToApi = async (children) => {
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
