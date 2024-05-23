import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3000/api/detalles";

const usePedidosdetalles = (id) => {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const detalleId = id;
    
  const fetchDetalles = async (detalleId) => {
    console.log(detalleId);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseUrl}/${detalleId}`);
     
      setDetalles(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetalles(detalleId);
  }, []);

  const refetchDetalles = () => {
    fetchDetalles();
  };
  //   const deletePedidos = async (pedido) => {
  //     const id = pedido.pedido_id;
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axios.delete(`${baseUrl}/${id}`);

  //       return response.data;
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   const reciclarPedidos = async (pedido) => {
  //     const id = pedido.pedido_id;
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axios.patch(`${baseUrl}/${id}`, { data: pedido });

  //       return response.data;
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  return {
    detalles,
    refetchDetalles,
    loading,
    error,
  };
};

export default usePedidosdetalles;
