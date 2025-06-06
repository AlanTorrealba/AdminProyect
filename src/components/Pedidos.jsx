  import { useEffect, useState, useMemo } from "react";
  import { FaTrash, FaEdit, FaList, FaPlus, FaRecycle } from "react-icons/fa";
  import usePedidos from "../hooks/usePedidos";
  import Swal from "sweetalert2";
  import { useForm } from "react-hook-form";
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
  import { Link } from "react-router-dom";

  import ModalClient from "./ModalClient";

  function Pedidos() {
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const {
      pedidos,
      loading,
      error,
      postData,
      refetchPedidos,
      deletePedidos,
      reciclarPedidos,
      setPedidos
    } = usePedidos();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [page, setPage] = useState(1);
    const [event, setEvent] = useState(false);
    const [pedido, setPedido] = useState({});
    const rowsPerPage = 10;
    const pages = Math.ceil(pedidos.length / rowsPerPage);

    const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return pedidos.slice(start, end);
    }, [page, pedidos]);

    // ...
    const onSubmit = handleSubmit(async (data) => {
      const pedidosResult = await postData(data);
      console.log("pedidosResult", pedidosResult);
      
      pedidosResult.success
        ? (reset(),
          onClose(),
          // setPedido((prevPedidos) => [...prevPedidos, pedidosResult.newPedido]),
          refetchPedidos(),
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
        : (refetchPedidos(),
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
      const result = await deletePedidos(id);
      result
        ? (refetchPedidos(),
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pedido Eliminado",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,
            background: "#ffff",
          }))
        : Swal.fire({
            position: "top-end",
            icon: "error",
            title: "ha ocurrido un error",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,
            background: "#ffff",
          });
    };
    const handlerEdit = async (pedido) => {
      await setPedido(pedido);
      await setEvent(true);
      onOpen();
    };
    const handlerReciclar = async (id) => {
      const result = await reciclarPedidos(id);
      result
        ? (refetchPedidos(),
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Pedido Reciclado",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,
            background: "#ffff",
          }))
        : Swal.fire({
            position: "top-end",
            icon: "error",
            title: "ha ocurrido un error",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,
            background: "#ffff",
          });
    };

    const handleOpen = async()=>{
      setEvent(false)
      onOpen()
    }
    return (
      <div className="flex flex-row flex-wrap ml-10 justify-center items-center">
        <div className="flex flex-wrap overflow-hidden"></div>
        <div className="m-10 w-full">
          <div className="flex flex-row justify-between">
            <h2>
              <b>Listado de Pedidos</b>
            </h2>
            <Button
              onPress={handleOpen}
              color="primary"
              variant="solid"
              className="mb-1"
            >
              <FaPlus />
              Crear pedido
            </Button>
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
              <TableColumn key="pedido_id">ID</TableColumn>
              <TableColumn key="nombre_cliente">Cliente</TableColumn>
              <TableColumn key="nombre_usuario">Usuario</TableColumn>
              <TableColumn key="nombre_repartidor">Repartidor</TableColumn>
              <TableColumn key="estatus_pedido">Estatus</TableColumn>
              <TableColumn key="accion">Acción</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={loading}
              loadingContent={<Spinner label="Loading..." />}
            >
              {loading
                ? ""
                : items.map((pedido) => (
                    <TableRow key={pedido.pedido_id}>
                      <TableCell>{pedido.pedido_id}</TableCell>
                      <TableCell>{pedido.nombre_cliente}</TableCell>
                      <TableCell>{pedido.nombre_usuario}</TableCell>
                      <TableCell>{pedido.nombre_repartidor}</TableCell>
                      <TableCell>
                        {" "}
                        <Chip color={pedido.estatus == 0 ? "danger" : "primary"}>
                          {pedido.estatus_pedido}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center gap-2">
                          <Tooltip
                            color="success"
                            content="Detalles"
                            className="text-white"
                          >
                            <Link
                              key={pedido.pedido_id}
                              to={`/pedidos/${pedido.pedido_id}`}
                            >
                              <span className="text-lg text-success cursor-pointer active:opacity-50">
                                <FaList />
                              </span>
                            </Link>
                          </Tooltip>
                          {pedido.estatus == 1 ? (
                          <Tooltip
                            className="text-white"
                            color="primary"
                            content="Editar"
                          >
                            <span
                              onClick={() => handlerEdit(pedido)}
                              className="text-lg text-primary cursor-pointer active:opacity-50"
                            >
                              <FaEdit />
                            </span>
                          </Tooltip>) : (
                            <Tooltip>
                        
                            </Tooltip>
                          ) }
                          {pedido.estatus == 1 ? (
                            <Tooltip
                              className="text-white"
                              color="danger"
                              content="Borrar"
                            >
                              <span
                                onClick={() => handlerDelete(pedido)}
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
                                onClick={() => handlerReciclar(pedido)}
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
        <ModalClient
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
          register={register}
          evento={event}
          pedido={pedido}
        />
      </div>
    );
  }

  export default Pedidos;
