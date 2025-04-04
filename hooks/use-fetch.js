import { useState } from "react";

export const useFetch = (cb) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fn = async (...args) => {
    setError(null);
    setIsLoading(true);
    try {
      const resp = await cb(...args);
      setData(resp);
      setError(null);
      setIsSuccess(true);
    } catch (e) {
      setError(e.message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  return { fn, error, isLoading, data, setData, isSuccess };
};
