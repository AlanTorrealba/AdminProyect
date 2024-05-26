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
  onSubmit,
  register,
}) {
  const { products } = useProducts();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };
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
                        key={products.producto_id}
                        value={products.producto_id}
                      >
                        {products.nombre +
                          " " +
                          "--" +
                          " " +
                          products.precio +
                          "$"}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    {...register("cantidad")}
                    label="Cantidad"
                    variant="bordered"
                  />
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
