import axios from "axios";
import { useState, useEffect } from "react";
const baseUrl = "http://localhost:3000/api/repartidor";
const useRepartidor = () => {
  const [repartidor, setRepartidor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepartidor = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(baseUrl);
        console.log(response.data.rows)
        setRepartidor(response.data.rows);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRepartidor()
  }, []);

  return { repartidor, loading, error };
};
export default useRepartidor;
