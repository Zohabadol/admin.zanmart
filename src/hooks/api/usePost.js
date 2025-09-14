// src/hooks/api/usePost.js

import { useState } from 'react'; 
import { privateRequest } from '../../config/axios.config';

const usePost = () => {
  const [data, setData] = useState(null);        // Success response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);      // Error message

  const postData = async (url, payload, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await privateRequest.post(url, payload, config);
      setData(response.data);
      return response.data; // Optional: Return data to caller
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
