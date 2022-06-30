import { useState, useEffect } from "react";

const useFetchCamps = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFunc = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Error fetching camp data");
        }
        const data = await res.json();

        if (data) {
          setIsLoading(false);
          setData(data);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchFunc();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchCamps;
