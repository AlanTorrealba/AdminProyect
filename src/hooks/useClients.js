import axios from "axios";
import { useState, useEffect } from 'react';
let baseUrl = "http://localhost:3000/api/client";
const useClients = () => {
    const [cliente, setCliente] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl);
          setCliente(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { cliente, loading, error };
  };
  
  export default useClients;
