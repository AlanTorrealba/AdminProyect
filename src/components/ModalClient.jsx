import React from "react";
import useClients from "../hooks/useClients";
import { FaRegEnvelopeOpen } from "react-icons/fa";
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

function ModalClient({ isOpen, onOpen, onClose, onOpenChange }) {
  const { cliente } = useClients();

  const hola = () => {
    console.log("hola");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hola");
    try {
      console.log("hola");
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
              <ModalHeader className="flex flex-col gap-1">
                Crear pedido
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  variant="flat"
                  onClick={hola()}
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

export default ModalClient;
