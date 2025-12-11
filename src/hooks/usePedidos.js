import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_BASE_URL}/citas`;
const token = localStorage.getItem("token");
const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPedidos(response.data.data);
     
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const postData = async (payload) => {
  //  payload["usuario"] = window.localStorage.getItem("user") 
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, payload , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return response.data;
      } else {
        // console.error("Error en la inserción:", response.data.message);
        return response.data;
      }
    } catch (error) {
      setError(error);
      // console.error("Error en la solicitud:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const refetchPedidos = () => {
    fetchPedidos();
  };
  const deletePedidos = async (pedido) => {
    const id = pedido.id;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const reciclarPedidos = async (pedido) => {
    const id = pedido.id;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${baseUrl}/reciclar/${id}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    pedidos,
    loading,
    error,
    postData,
    refetchPedidos,
    deletePedidos,
    reciclarPedidos,
    setPedidos,
  };
};

export default usePedidos;
