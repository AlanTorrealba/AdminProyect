import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL);
const token = localStorage.getItem("token");
let baseUrl = `${API_BASE_URL}/servicios`;
const useServices = () => {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setServicios(data);
        console.log(data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { servicios, loading, error };
};

export default useServices;
