import axios from "axios";
import { useState, useEffect } from 'react';
let baseUrl = "http://localhost:3000/api/pedidos";
const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl);
          setPedidos(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  console.log(pedidos)
    return { pedidos, loading, error };
  };
  
  export default usePedidos;
