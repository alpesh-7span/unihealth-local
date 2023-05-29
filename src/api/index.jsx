import {
    GET_EVENT
  } from "./URLConstants";

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      setError(error.message);
    }
  };

  export const geEvents = async () => {
    return await fetchData({ method: "get", url: GET_EVENT });
  };