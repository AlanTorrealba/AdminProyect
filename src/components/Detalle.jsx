import React from "react";
import { FaPlus, FaRecycle, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import usePedidosdetalles from "../hooks/usePedidosdetalles";
import { useForm } from "react-hook-form";
import {  useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
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
  Spinner,
  Chip,
} from "@nextui-org/react";
import ModalDetalle from "./ModalDetalle";
function Detalle() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { detalleid } = useParams();
  const { detalles, loading, postData, refetchDetalles, deleteDetalles, reciclarDetalles} = usePedidosdetalles(detalleid);
  const [page, setPage] = useState(1);
  const [event, setEvent] = useState(false);
  const rowsPerPage = 10;
  const pages = Math.ceil(detalles.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return detalles.slice(start, end);
  }, [page, detalles]);

  const onSubmit = handleSubmit(async (data) => {
    data["pedidoId"] = detalleid;
    const detallesResult = await postData(data);
    detallesResult.success
      ? (reset(),
        onClose(),
        await refetchDetalles(detalleid),
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "exito al crear pedido",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          background: "#ffff",
        }))
      : (
        await refetchDetalles(detalleid),
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "error al crear pedido",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          background: "#ffff",
        }));
  });
  const handlerDelete = async (id) => {
    try {
      const result = await deleteDetalles(id);
      if (result) {
        await refetchDetalles(detalleid);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Detalle Eliminado",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          background: "#ffff",
        });
      } else {
        throw new Error("Ha ocurrido un error");
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        background: "#ffff",
      });
    }
  };

  const handlerReciclar = async (id) => {
    try {
      const result = await reciclarDetalles(id);
      if (result) {
        await refetchDetalles(detalleid);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Detalle Reciclado",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          toast: true,
          background: "#ffff",
        });
      } else {
        throw new Error("Ha ocurrido un error");
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        background: "#ffff",
      });
    }
  };
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="flex flex-row flex-wrap ml-10 justify-center items-center">
      <div className="flex flex-wrap overflow-hidden"></div>
      <div className="m-10 w-full">
        <div className="flex flex-row justify-between">
          <h2>
            <b>Detalles del pedido {detalleid}</b>
          </h2>
          <div>
            <Link to={`/pedidos`}>
              <Button
                color="primary"
                variant="solid"
                className="mb-1 mr-3"
              >
                <FaRecycle />
                Volver
              </Button>
            </Link>
            <Button
              onPress={onOpen}
              color="primary"
              variant="solid"
              className="mb-1"
            >
              <FaPlus />
              Crear detalle
            </Button>
          </div>
        </div>

        <Table
          color={"primary"}
          // selectionMode="multiple"

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
            <TableColumn key="detalle_">ID</TableColumn>
            <TableColumn key="detalle_producto">Producto</TableColumn>
            <TableColumn key="detalle_cantidad">Cantidad</TableColumn>
            <TableColumn key="detalle_precio">Precio</TableColumn>
            <TableColumn key="datalle_status">Estatus</TableColumn>
            <TableColumn key="accion">Acción</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={loading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {loading
              ? ""
              : items.map((detalles) => (
                  <TableRow key={detalles.detalle_id}>
                    <TableCell>{detalles.detalle_id}</TableCell>
                    <TableCell>{detalles.nombre}</TableCell>
                    <TableCell>{detalles.cantidad}</TableCell>
                    <TableCell>{detalles.precio_unitario}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        color={detalles.estatus == 0 ? "danger" : "primary"}
                      >
                        {detalles.estatus == 0 ? "Eliminado" : "Activo"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        {/* <Tooltip
                          color="success"
                          content="Detalles"
                          className="text-white"
                        >
                          <Link
                            key={detalles.id}
                            to={`/pedidos/${detalles.id}`}
                          >
                            <span className="text-lg text-success cursor-pointer active:opacity-50">
                              <FaList />
                            </span>
                          </Link>
                        </Tooltip> */}
                        <Tooltip
                          className="text-white"
                          color="primary"
                          content="Editar"
                        >
                          <span
                            onClick={() => handlerEdit(detalles.detalle_id)}
                            className="text-lg text-primary cursor-pointer active:opacity-50"
                          >
                            <FaEdit />
                          </span>
                        </Tooltip>
                        {detalles.estatus == 1 ? (
                          <Tooltip
                            className="text-white"
                            color="danger"
                            content="Borrar"
                          >
                            <span
                              onClick={() => handlerDelete(detalles.detalle_id)}
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                              <FaTrash />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            className="text-white"
                            color="primary"
                            content="reciclar"
                          >
                            <span
                              onClick={() => handlerReciclar(detalles.detalle_id)}
                              className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                            >
                              <FaRecycle />
                            </span>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <ModalDetalle isOpen={isOpen} onOpenChange={onOpenChange} 
        register={register} onSubmit={onSubmit}
        evento={event} />
    </div>
  );
}

export default Detalle;
