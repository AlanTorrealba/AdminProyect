import React from "react";
import { FaPlus, FaRecycle, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import usePedidosdetalles from "../hooks/usePedidosdetalles";
import { useForm } from "react-hook-form";
import {  useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Toast from "../utils/Toast";
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
    const servicios = detalles?.citaServicios || [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return servicios.slice(start, end);
  }, [page, detalles]);

  const onSubmit = handleSubmit(async (data) => {
    data["pedidoId"] = detalleid;
    const detallesResult = await postData(data);
    detallesResult.success
      ? (reset(),
        onClose(),
        await refetchDetalles(detalleid),
        Toast.fire({
          icon: "success",
          title: "exito al crear pedido",
          background: "#ffff",
        }))
      : (
        await refetchDetalles(detalleid),
        Toast.fire({
          icon: "error",
          title: "error al crear pedido",
          background: "#ffff",
        }));
  });
  const handlerDelete = async (id) => {
    try {
      const result = await deleteDetalles(id);
      if (result) {
        await refetchDetalles(detalleid);
        Toast.fire({
          icon: "success",
          title: "Detalle Eliminado",
          background: "#ffff",
        });
      } else {
        throw new Error("Ha ocurrido un error");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message || "Ha ocurrido un error",
        background: "#ffff",
      });
    }
  };

  const handlerReciclar = async (id) => {
    try {
      const result = await reciclarDetalles(id);
      if (result) {
        await refetchDetalles(detalleid);
        Toast.fire({
          icon: "success",
          title: "Detalle Reciclado",
          background: "#ffff",
        });
      } else {
        throw new Error("Ha ocurrido un error");
      }
    } catch (error) {
      Toast.fire({
       icon: "error",
        title: error.message || "Ha ocurrido un error",
        background: "#ffff",
      });
    }
  };
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="flex flex-row flex-wrap ml-4 justify-center items-center">
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
            <TableColumn key="detalle_precio">Precio ( $ )</TableColumn>
            <TableColumn key="datalle_status">Estatus</TableColumn>
            <TableColumn key="accion">Acción</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={loading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {loading
              ? ""
              : (detalles?.citaServicios || []).map((servicio) => (
                  <TableRow key={servicio.id}>
                    <TableCell>{servicio.id}</TableCell>
                    <TableCell>{servicio.servicio?.nombre}</TableCell>
                    <TableCell>{servicio.cantidad}</TableCell>
                    <TableCell>{servicio.precio}</TableCell>
                    <TableCell>
                      <Chip color={servicio.isActive ? "primary" : "danger"}>
                        {servicio.isActive ? "Activo" : "Eliminado"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-2">
                        <Tooltip
                          className="text-white"
                          color="primary"
                          content="Editar"
                        >
                          <span
                            onClick={() => handlerEdit(servicio.id)}
                            className="text-lg text-primary cursor-pointer active:opacity-50"
                          >
                            <FaEdit />
                          </span>
                        </Tooltip>
                        {servicio.isActive ? (
                          <Tooltip
                            className="text-white"
                            color="danger"
                            content="Borrar"
                          >
                            <span
                              onClick={() => handlerDelete(servicio.id)}
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                              <FaTrash />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            className="text-white"
                            color="primary"
                            content="Reciclar"
                          >
                            <span
                              onClick={() => handlerReciclar(servicio.id)}
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
