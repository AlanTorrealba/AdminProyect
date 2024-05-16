import React from "react";
import { FaTrash, FaEdit, FaList, FaPlus, FaRecycle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
import Tabla from "./Tabla";
import ModalDetalle from "./ModalDetalle";
function Detalle() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="flex flex-row flex-wrap ml-10 justify-center items-center">
      <div className="flex flex-wrap overflow-hidden"></div>
      <div className="m-10 w-full">
        <div className="flex flex-row justify-between">
          <h2>
            <b>Listado de productos</b>
          </h2>
          <div>
            <Link to={`/pedidos`}>
            <Button
              onPress={"hola"}
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

        <Tabla />
      </div>
      <ModalDetalle
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default Detalle;
