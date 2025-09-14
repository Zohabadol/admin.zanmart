import { useCallback, useEffect, useState } from "react";
import { privateRequest } from "../../config/axios.config";

const useFetch = (url = "") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await privateRequest.get(url);
      setData(result?.data); // Set the result to state
    } catch (error) {
      // console.error("Fetch Category Error:", error); // Handle errors
    }

    setLoading(false); // End loading (handled in both success and error)
  }, []);
  useEffect(() => {
    refetch();
  }, [url, refetch]);

  return { data, loading,refetch };
};

export default useFetch;
