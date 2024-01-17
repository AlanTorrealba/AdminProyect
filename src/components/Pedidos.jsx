import { useEffect, useState, useMemo } from "react";
import { FaTrash, FaEdit, FaList, FaPlus } from "react-icons/fa";
import usePedidos from "../hooks/usePedidos";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import ModalClient from "./ModalClient";

function Pedidos() {
  const { pedidos, loading, error } = usePedidos();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(pedidos.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return pedidos.slice(start, end);
  }, [page, pedidos]);

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
        <div className="flex flex-row justify-between">
          <h2>Listado de Pedidos</h2>
          <Button onPress={onOpen} color="primary" variant="solid">
            <FaPlus />
            Crear pedido
          </Button>
        </div>

        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="pedido_id">ID</TableColumn>
            <TableColumn key="nombre_cliente">Cliente</TableColumn>
            <TableColumn key="nombre_usuario">Usuario</TableColumn>
            <TableColumn key="nombre_repartidor">Repartidor</TableColumn>
            <TableColumn key="estatus_pedido">Estatus</TableColumn>
            <TableColumn key="accion">Acción</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((pedido) => (
              <TableRow key={pedido.pedido_id}>
                <TableCell>{pedido.pedido_id}</TableCell>
                <TableCell>{pedido.nombre_cliente}</TableCell>
                <TableCell>{pedido.nombre_usuario}</TableCell>
                <TableCell>{pedido.nombre_repartidor}</TableCell>
                <TableCell>{pedido.estatus_pedido}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip
                      color="success"
                      content="Detalles"
                      className="text-white"
                    >
                      <span className="text-lg text-success cursor-pointer active:opacity-50">
                        <FaList />
                      </span>
                    </Tooltip>
                    <Tooltip
                      className="text-white"
                      color="primary"
                      content="Editar"
                    >
                      <span className="text-lg text-primary cursor-pointer active:opacity-50">
                        <FaEdit />
                      </span>
                    </Tooltip>
                    <Tooltip
                      className="text-white"
                      color="danger"
                      content="Borrar"
                    >
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <FaTrash />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalClient
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />

      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear pedido
              </ModalHeader>
              <ModalBody>
                <Select
                  // endContent={
                  //   <FaRegEnvelopeOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Cliente"
                  placeholder="Seleccione un cliente"
                  variant="bordered"
                >
                  {cliente.map((cliente) => (
                    <SelectItem
                      key={cliente.cliente_id}
                      value={cliente.cliente_id}
                    >
                      {cliente.nombre}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  endContent={
                    <FaRegEnvelopeOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Cliente"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat">
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </div>
  );
}

export default Pedidos;
