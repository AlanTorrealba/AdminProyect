  import { useEffect, useState, useMemo } from "react";
  import { FaTrash, FaEdit, FaList, FaPlus, FaRecycle } from "react-icons/fa";
  import usePedidos from "../hooks/usePedidos";
  import Toast from "../utils/Toast";
  import { useForm, Controller } from "react-hook-form";
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
  import Formulario from "./Formulario";
  function Pedidos() {
    const {
      control,
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
      const payload = {
        clienteId: Number(data.cliente),
        vehiculoId: Number(data.vehiculo),
        tarifaId: 1,
        estatusId: 1,
        fecha: new Date().toISOString().split('T')[0],
        detalles: data.servicios?.map(item => ({servicioId: Number(item.id), precio: Number(item.precio)})) || [],
      };

      const pedidosResult = await postData(payload);      
      pedidosResult.success
        ? (reset(),
          onClose(),
          // setPedido((prevPedidos) => [...prevPedidos, pedidosResult.newPedido]),
          refetchPedidos(),
         Toast.fire({
            icon: "success",
            title: "Cita creada",
            background: "#ffff",
          }))
        : (refetchPedidos(),
          Toast.fire({
            icon: "error",
            title: "ha ocurrido un error",
            background: "#ffff",
          }));
    });
    const handlerDelete = async (pedido) => {
      const result = await deletePedidos(pedido);
      result
        ? (refetchPedidos(),
          Toast.fire({
            icon: "success",
            title: "Cita eliminada",
            background: "#ffff",
          }))
        : Toast.fire({
            icon: "error",
            title: "ha ocurrido un error",
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
          Toast.fire({
            icon: "success",
            title: "Cita reciclada",
            background: "#ffff",
          }))
        : Toast.fire({
            icon: "error",
            title: "ha ocurrido un error",
            background: "#ffff",
          });
    };

    const handleOpen = async()=>{
      setEvent(false)
      onOpen()
    }
    return (
      <div className="flex flex-row flex-wrap  justify-center items-center">
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
              <TableColumn key="nombre_repartidor">Total $</TableColumn>
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
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.id}</TableCell>
                      <TableCell>{pedido.cliente.nombre}</TableCell>
                      <TableCell>{pedido.nombre_usuario}</TableCell>
                      <TableCell>{pedido.total}</TableCell>
                      <TableCell>
                        {" "}
                        <Chip color={pedido.isActive ? "primary" : "danger" }>
                          {pedido.isActive ? "Activo" : "Inactivo"}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="relative flex items-center gap-2">
                          {pedido.isActive ? (
                            <Tooltip
                              color="success"
                              content="Detalles"
                              className="text-white"
                            > 
                            <Link
                              key={pedido.id}
                              to={`/pedidos/${pedido.id}`}
                            >
                              <span className="text-lg text-success cursor-pointer active:opacity-50">
                                <FaList />
                              </span>
                            </Link>
                          </Tooltip>) : (<Tooltip></Tooltip>) }
                          {pedido.isActive ? (
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
                          {pedido.isActive ? (
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
          Controller={Controller}
          control={control}
        />
      </div>
    );
  }

  export default Pedidos;
