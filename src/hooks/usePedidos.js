import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000/api/pedidos";

const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(baseUrl);
      setPedidos(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const postData = async (data) => {
   data["usuario"] = window.localStorage.getItem("user") 
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, {
        params: data,
      });

      if (response.data.success) {
        return response.data;
      } else {
        console.error("Error en la inserción:", response.data.message);
        return response.data;
      }
    } catch (error) {
      setError(error);
      console.error("Error en la solicitud:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const refetchPedidos = () => {
    fetchPedidos();
  };
  const deletePedidos = async (pedido) => {
    const id = pedido.pedido_id;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);

      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const reciclarPedidos = async (pedido) => {
    const id = pedido.pedido_id;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${baseUrl}/${id}`, { data: pedido });

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
  };
};

export default usePedidos;
