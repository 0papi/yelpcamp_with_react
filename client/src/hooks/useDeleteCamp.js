import { useState } from "react";

const useDeleteCamp = (url, token) => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOk, setIsOk] = useState(false);

  const deleteCamp = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

      if (res.status === 401) {
        setIsError(true);
        throw new Error("Please you are not authorized");
      }

      if (res.ok) {
        setIsOk(true);
      }
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.message);
    }
  };

  return {
    deleteCamp,
    isOk,
    isError,
    errorMsg,
  };
};

export default useDeleteCamp;
