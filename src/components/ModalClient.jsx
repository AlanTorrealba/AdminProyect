import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
  Chip,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import {
  Check,
  Car,
  User,
  ClipboardCheck,
  Bubbles,
  Search,
} from "lucide-react";
import useClients from "../hooks/useClients";
import useServices from "../hooks/useService";

function StepperAutolavado({
  isOpen,
  onOpenChange,
  register,
  onSubmit,
  evento,
  pedido,
  cliente = [],
  vehiculos = [],
  control,
}) {
  const { clientes, vehiculo } = useClients();
  const { servicios } = useServices();
  const [currentStep, setCurrentStep] = useState(0);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedServicios, setSelectedServicios] = useState([]); // Cambio a array
  const [searchServicio, setSearchServicio] = useState(""); // Para búsqueda

  const steps = [
    {
      id: 0,
      name: "Cliente",
      icon: User,
      description: "Selecciona el cliente",
    },
    { id: 1, name: "Vehículo", icon: Car, description: "Elige el vehículo" },
    {
      id: 2,
      name: "Servicios",
      icon: Bubbles,
      description: "Elige los servicios",
    },
    {
      id: 3,
      name: "Confirmar",
      icon: ClipboardCheck,
      description: "Revisa los datos",
    },
  ];

  const handleSubmit = async () => {
    try {
      onSubmit();
      resetStepper();
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSelectClient = (value) => {
    const clienteSeleccionado = Number(value);
    setSelectedClient(clientes.find((c) => c.id === clienteSeleccionado));

    const filtrados =
      clientes.find((c) => c.id === clienteSeleccionado)?.vehiculos || [];

    setVehiculosFiltrados(filtrados);

    if (filtrados.length > 0) {
      setCurrentStep(1);
    }
  };

  const handlerSelectVehicle = (value) => {
    const vehiculoSeleccionado = Number(value);
    setSelectedVehicle(
      vehiculosFiltrados.find((v) => v.id === vehiculoSeleccionado)
    );
    setCurrentStep(2);
  };

  const handleAddServicio = (servicioId) => {
    const servicio = servicios.find((s) => s.id === Number(servicioId));
    if (servicio && !selectedServicios.find((s) => s.id === servicio.id)) {
      setSelectedServicios([...selectedServicios, servicio]);
      setSearchServicio("");
    }
  };
  const handleRemoveServicio = (servicioId) => {
    setSelectedServicios(selectedServicios.filter((s) => s.id !== servicioId));
  };

  const calculateTotal = () => {
    return selectedServicios.reduce(
      (total, servicio) => total + Number(servicio.precio),
      0
    );
  };

  const serviciosDisponibles = servicios.filter(
    (s) =>
      !selectedServicios.find((selected) => selected.id === s.id) &&
      (s.nombre.toLowerCase().includes(searchServicio.toLowerCase()) ||
        s.precio.toString().includes(searchServicio))
  );

  const resetStepper = () => {
    setCurrentStep(0);
    setVehiculosFiltrados([]);
    setSelectedClient(null);
    setSelectedVehicle(null);
    setSelectedServicios([]);
    setSearchServicio("");
  };

  const goToStep = (step) => {
    if (step === 0) {
      setCurrentStep(0);
    } else if (step === 1 && selectedClient) {
      setCurrentStep(1);
    } else if (step === 2 && selectedClient && selectedVehicle) {
      setCurrentStep(2);
    } else if (
      step === 3 &&
      selectedClient &&
      selectedVehicle &&
      selectedServicios.length > 0
    ) {
      setCurrentStep(3);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      size="3xl"
      onOpenChange={(open) => {
        if (!open) {
          resetStepper();
        }
        onOpenChange(open);
      }}
      backdrop="blur"
      placement="center"
      portalContainer={document.body}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        wrapper: "overflow-visible",
        base: "overflow-visible",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2 pb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {evento
                  ? `Editar Pedido N° ${pedido?.pedido_id}`
                  : "Nuevo servicio"}
              </h3>
              <div className="flex items-center justify-between mt-4 px-4">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div
                      className="flex flex-col items-center gap-2 cursor-pointer transition-all"
                      onClick={() => goToStep(step.id)}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep > step.id
                            ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50"
                            : currentStep === step.id
                            ? "bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50 scale-110"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <step.icon
                            className={`w-6 h-6 ${
                              currentStep === step.id
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <p
                          className={`text-sm font-semibold ${
                            currentStep === step.id
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {step.name}
                        </p>
                        <p className="text-xs text-gray-400 hidden sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            currentStep > step.id
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 w-full"
                              : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              {currentStep === 0 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <User className="w-16 h-16 mx-auto text-blue-600 mb-2" />
                    <h4 className="text-xl font-semibold">
                      {selectedClient?.nombre || "Selecciona un Cliente"}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Busca por nombre o cédula
                    </p>
                  </div>
                  <Controller
                    name="cliente"
                    control={control}
                    rules={{ required: "El cliente es obligatorio" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        label="Cliente"
                        placeholder="Escribe para buscar..."
                        defaultSelectedKeys={evento ? [pedido?.clienteId] : []}
                        onSelectionChange={(value) => {
                          field.onChange(value);
                          handlerSelectClient(value);
                        }}
                        variant="bordered"
                        size="lg"
                        classNames={{
                          base: "max-w-full",
                          listboxWrapper: "max-h-[320px]",
                        }}
                        popoverProps={{
                          placement: "bottom-start",
                          shouldFlip: false,
                          offset: 5,
                        }}
                      >
                        {clientes.map((c) => (
                          <AutocompleteItem
                            key={c.id}
                            value={c.id}
                            textValue={`${c.nombre} ${c.cedula}`}
                            className="py-3"
                          >
                            <div className="flex flex-col">
                              <span className="font-semibold">{c.nombre}</span>
                              <span className="text-sm text-gray-500">
                                {c.cedula}
                              </span>
                            </div>
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    )}
                  />
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <Car className="w-16 h-16 mx-auto text-blue-600 mb-2" />
                    <h4 className="text-xl font-semibold">
                      Selecciona un vehículo
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Cliente:{" "}
                      <span className="font-semibold text-gray-700">
                        {selectedClient?.nombre}
                      </span>
                    </p>
                  </div>
                  <Controller
                    name="vehiculo"
                    control={control}
                    rules={{ required: "El vehículo es obligatorio" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        label="Vehículo"
                        placeholder={
                          vehiculosFiltrados.length === 0
                            ? "No hay vehículos registrados"
                            : "Selecciona la placa del vehículo"
                        }
                        isDisabled={vehiculosFiltrados.length === 0}
                        variant="bordered"
                        size="lg"
                        onSelectionChange={(value) => {
                          field.onChange(value);
                          handlerSelectVehicle(value);
                        }}
                        classNames={{
                          base: "max-w-full",
                        }}
                      >
                        {vehiculosFiltrados.map((v) => (
                          <AutocompleteItem
                            key={v.id}
                            value={v.id}
                            className="py-3"
                          >
                            <div className="flex items-center gap-2">
                              <Car className="w-5 h-5 text-gray-500" />
                              <span className="font-semibold text-lg">
                                {v.placa}
                              </span>
                            </div>
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    )}
                  />
                  {vehiculosFiltrados.length === 0 && (
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-yellow-800 dark:text-yellow-200">
                        Este cliente no tiene vehículos registrados
                      </p>
                    </div>
                  )}
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <Bubbles className="w-16 h-16 mx-auto text-blue-600 mb-2" />
                    <h4 className="text-xl font-semibold">
                      Selecciona los servicios
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Cliente:{" "}
                      <span className="font-semibold text-gray-700">
                        {selectedClient?.nombre}
                      </span>
                    </p>
                  </div>
                  {selectedServicios.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Servicios seleccionados ({selectedServicios.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedServicios.map((servicio) => (
                          <Chip
                            key={servicio.id}
                            color="primary"
                            variant="flat"
                            onClose={() => handleRemoveServicio(servicio.id)}
                            className="font-semibold"
                          >
                            {servicio.nombre} - ${servicio.precio}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                  <Controller
                    name="servicios"
                    control={control}
                    rules={{
                      validate: () =>
                        selectedServicios.length > 0 ||
                        "Debes seleccionar al menos un servicio",
                    }}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          label="Buscar servicios"
                          placeholder="Escribe para buscar..."
                          value={searchServicio}
                          onChange={(e) => setSearchServicio(e.target.value)}
                          onFocus={() =>
                            setSearchServicio(searchServicio || " ")
                          }
                          variant="bordered"
                          size="lg"
                          startContent={
                            <Search className="w-5 h-5 text-gray-400" />
                          }
                        />
                        {searchServicio && serviciosDisponibles.length > 0 && (
                          <div className="absolute  w-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-scroll">
                            {serviciosDisponibles.map((servicio) => (
                              <div
                                key={servicio.id}
                                onClick={() => {
                                  const nuevoServicio = servicios.find(s=> s.id=== servicio.id);
                                  const nuevosServicios = [...selectedServicios, nuevoServicio];
                                  handleAddServicio(servicio.id);
                                  field.onChange(nuevosServicios.map(s=> ({id: s.id, precio: s.precio})));
                                  // field.onChange([
                                  //   ...selectedServicios.map((s) => (s.id),
                                  //   servicio.id,
                                  // ]);
                                }}
                                className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0 bg-white "
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Bubbles className="w-5 h-5 text-gray-500" />
                                    <div>
                                      <p className="font-semibold text-gray-900 dark:text-white">
                                        {servicio.nombre}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Precio: ${servicio.precio}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                    Click para agregar
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {searchServicio &&
                          serviciosDisponibles.length === 0 && (
                            <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 text-center">
                              <p className="text-gray-500 text-sm">
                                No se encontraron más servicios
                              </p>
                            </div>
                          )}
                      </div>
                    )}
                  />

                  {
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total de servicios
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedServicios.length}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Precio total
                          </p>
                          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${calculateTotal()}
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="text-center mb-6">
                    <ClipboardCheck className="w-16 h-16 mx-auto text-green-600 mb-2" />
                    <h4 className="text-xl font-semibold">Confirmar Pedido</h4>
                    <p className="text-gray-500 text-sm">
                      Revisa la información antes de guardar
                    </p>
                  </div>

                  <Card className="border-2 border-blue-100 dark:border-blue-900">
                    <CardBody className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Cliente</p>
                          <p className="font-semibold text-lg">
                            {selectedClient?.nombre}
                          </p>
                          <p className="text-sm text-gray-600">
                            {selectedClient?.cedula}
                          </p>
                        </div>
                        <Chip color="primary" variant="flat" size="sm">
                          Confirmado
                        </Chip>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Car className="w-5 h-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Vehículo</p>
                          <p className="font-semibold text-lg">
                            {selectedVehicle?.placa}
                          </p>
                        </div>
                        <Chip color="primary" variant="flat" size="sm">
                          Confirmado
                        </Chip>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Bubbles className="w-5 h-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-2">
                            Servicios seleccionados
                          </p>
                          <div className="space-y-2">
                            {selectedServicios.map((servicio, idx) => (
                              <div
                                key={servicio.id}
                                className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg px-3 py-2"
                              >
                                <span className="font-medium text-sm">
                                  {idx + 1}. {servicio.nombre}
                                </span>
                                <span className="font-bold text-blue-600">
                                  ${servicio.precio}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                            <span className="font-bold text-gray-900 dark:text-white">
                              Total:
                            </span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              ${calculateTotal()}
                            </span>
                          </div>
                        </div>
                        <Chip color="primary" variant="flat" size="sm">
                          Confirmado
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}
            </ModalBody>

            <ModalFooter className="border-t pt-4">
              <div className="flex justify-between w-full">
                <Button
                  variant="flat"
                  onPress={() => {
                    if (currentStep > 0) {
                      setCurrentStep(currentStep - 1);
                    } else {
                      onClose();
                      resetStepper();
                    }
                  }}
                >
                  {currentStep === 0 ? "Cancelar" : "Atrás"}
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    color="success"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg"
                    onPress={handleSubmit}
                    startContent={<Check className="w-5 h-5" />}
                  >
                    Guardar Pedido
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600"
                    isDisabled={
                      (currentStep === 0 && !selectedClient) ||
                      (currentStep === 1 && !selectedVehicle) ||
                      (currentStep === 2 && selectedServicios.length === 0)
                    }
                    onPress={() => setCurrentStep(currentStep + 1)}
                  >
                    Continuar
                  </Button>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default StepperAutolavado;
