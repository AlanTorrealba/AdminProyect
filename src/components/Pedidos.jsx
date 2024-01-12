import { useEffect, useState } from "react";
import usePedidos from "../hooks/usePedidos";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
function Pedidos() {
  const { pedidos, loading, error } = usePedidos();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al obtener los pedidos: {error.message}</p>;
  }
  return (
    <div className="flex flex-row flex-wrap ml-10 justify-center items-center">
      <div className="flex flex-wrap overflow-hidden"></div>
      <div className="m-10 w-full">

      <div>
      <h2>Listado de Pedidos</h2>
      {/* <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.pedido_id}>
            id: {pedido.pedido_id},
            Cliente: {pedido.cliente_id}, Usuario: {pedido.repartidor_id}, Estatus: {pedido.estatus_pedido}
          </li>
        ))}
      </ul> */}
    </div>
{console.table(pedidos)}
       


        <Table
          isStriped
          danger
          className=""
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Cliente</TableColumn>
            <TableColumn>Usuario</TableColumn>
            <TableColumn>repartidor</TableColumn>
            <TableColumn>Estatus</TableColumn>
            <TableColumn>accion</TableColumn>
          </TableHeader>
          <TableBody>

           
            {pedidos.map(pedidos => (
              
              <TableRow key={pedidos.pedido_id}>
                <TableCell>{pedidos.pedido_id}</TableCell>
                <TableCell>{pedidos.nombre_cliente}</TableCell>
                <TableCell>{pedidos.nombre_usuario}</TableCell>
                <TableCell>{pedidos.nombre_repartidor}</TableCell>
                <TableCell>{pedidos.estatus_pedido}</TableCell>
                <TableCell><button className="flex rounded bg-red-500 text-white ">Borrar</button></TableCell>
              </TableRow>
            ))}
              {/* <TableRow key={pedido.pedido_id}>
              <TableCell>{pedido.pedido.id}</TableCell>
              <TableCell>{pedido.usuario_id}</TableCell>
              <TableCell>{pedido.estatus_pedido}</TableCell>
            </TableRow> */}
           
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Pedidos;
