import axios from "axios";
import { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL)
const token = localStorage.getItem("token");
let baseUrl = `${API_BASE_URL}/client`;
const useClients = () => {
    const [cliente, setCliente] = useState([]);
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
      console.log(response.data.data)
      setCliente(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
      fetchData();
    }, []);
    return { cliente, loading, error };
  };
  
  export default useClients;
