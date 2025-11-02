import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL);
const token = localStorage.getItem("token");
let baseUrl = `${API_BASE_URL}/client`;
const useClients = () => {
  const [cliente, setCliente] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vehiculos, setVehiculos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setCliente(data);
        const vehiculosUnicos = [
          ...new Map(
            data
              .flatMap((c) => c.vehiculos)
              .filter((v) => v.isActive)
              .map((v) => [v.id, v])
          ).values(),
        ];
        setVehiculos(vehiculosUnicos);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { cliente, loading, vehiculos, error };
};

export default useClients;
