import React from "react";
import useClients from "../hooks/useClients";
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
  const { cliente, vehiculos } = useClients();
  const [vehiculosFiltrados, setVehiculosFiltrados] = React.useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSelect = (value) => {
    const clienteSeleccionado = Number(value);
    const filtrados = vehiculos.filter(
      (vehiculos) => vehiculos.clienteId === clienteSeleccionado
    );
    if (filtrados.length === 0) {
      setVehiculosFiltrados([]);
      return;
    }
    setVehiculosFiltrados(filtrados);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        size={"5xl"}
        onOpenChange={(open) => {
          if (!open) {
            setVehiculosFiltrados([]);
          }
          onOpenChange(open);
        }}
        backdrop={"blur"}
        placement="top-center"
        shouldCloseOnInteractOutside={true}
      >
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
                    defaultSelectedKeys={evento ? pedido?.clienteId : ""}
                    scrollShadowProps={{
                      isEnabled: true,
                    }}
                    className="max-h-24"
                    onSelectionChange={handlerSelect}
                    disablePortal
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
                  <Autocomplete
                    {...register("vehiculo")}
                    label="Vehiculo"
                    placeholder={
                      vehiculosFiltrados.length === 0
                        ? "No hay vehículos para este cliente"
                        : "Selecciona un vehículo"
                    }
                    isDisabled={vehiculosFiltrados.length === 0}
                    variant="bordered"
                    className="mt-4"
                  >
                    {vehiculosFiltrados.map((vehiculos) => (
                      <AutocompleteItem key={vehiculos.id} value={vehiculos.id}>
                        {vehiculos.placa}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
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
