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
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/react";

function ModalClient({
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
  register,
  onSubmit,
  evento,
  pedido,
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
                {evento ? "Editar" : "Crear"} pedido{" "}
                {evento ? "- N° " + pedido.pedido_id : ""}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Autocomplete
                    {...register("cliente")}
                    label="Cliente"
                    placeholder="Seleccione un cliente"
                    variant="bordered"
                    defaultSelectedKeys={evento ? pedido?.cliente_id : ""}
                    scrollShadowProps={{
                      isEnabled: true,
                    }}
                    className="max-h-24"
                  >
                    {cliente.map((cliente) => (
                      <AutocompleteItem
                        key={cliente.id}
                        value={cliente.id}
                        textValue={`${cliente.nombre} ${cliente.cedula}`}
                      >
                        {cliente.nombre} {cliente.cedula}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Select
                    {...register("vehiculo")}
                    label="Vehiculo"
                    placeholder="Seleccione un vehiculo"
                    variant="bordered"
                    className="mt-4"
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

                  {/* <Input
                    {...register("usuario")}
                    placeholder="Seleccione el usuario"
                    type="text"
                    variant="bordered"
                    value={window.localStorage.getItem("user")}
                    isDisabled
                    className="invisible"
                  /> */}
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
