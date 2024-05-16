import React from "react";
import useProducts from "../hooks/useProducts";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
function ModalDetalle({
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
}) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { products } = useProducts();

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Select
                    {...register("products")}
                    label="Productos"
                    placeholder="Seleccione un producto"
                    variant="bordered"
                  >
                    {products.map((products) => (
                      <SelectItem
                        key={products.cliente_id}
                        value={products.cliente_id}
                      >
                        {products.nombre + ' ' + '--' +' ' + products.precio + '$'} 
                      </SelectItem>
                    ))}
                  </Select>
                  <Input label="Cantidad" variant="bordered" />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  variant="flat"
                  onClick={handleSubmit}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalDetalle;
