import React from "react";
import useClients from "../hooks/useClients";
import useRepartidor from "../hooks/useRepartidor";
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

function ModalClient({
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
  register,
  onSubmit,
}) {
  const { cliente } = useClients();
  const { repartidor } = useRepartidor();

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
              <ModalHeader className="flex flex-col gap-1">
                Crear pedido
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Select
                    // endContent={
                    //   <FaRegEnvelopeOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    // }
                    {...register("cliente")}
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
                  <Select
                    {...register("repartidor")}
                    label="Repartidor"
                    placeholder="Seleccione un repartidor"
                    variant="bordered"
                  >
                    {repartidor.map((repartidor) => (
                      <SelectItem
                        key={repartidor.repartidor_id}
                        value={repartidor.repartidor_id}
                      >
                        {repartidor.nombre}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    {...register("usuario")}
                    label="Usuario"
                    placeholder="Seleccione el usuario"
                    type="text"
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

export default ModalClient;
