import axios from "axios";
import { useState, useEffect } from 'react';
let baseUrl = "http://localhost:3000/servicios";
const useProducts = () => {
    const [products, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          });
          console.log(response)
          setProductos(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    return { products, loading, error };
  };
  
  export default useProducts;
