import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  ButtonGroup,
  Progress,
  Spacer,
  Avatar,
  Divider,
  Select,
  SelectItem
} from "@nextui-org/react";
import DashboardTanques from './DashboardTanques';


const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Datos de ejemplo para el dashboard
  const stats = {
    ordenesAbiertas: 12,
    ingresosDiarios: 2450.50,
    ordenesCompletas: 48,
    clientesAtendidos: 156
  };

  // Datos para las métricas de servicios
  const serviciosPorVehiculo = [
    { vehiculo: 'Autos', servicios: 145, porcentaje: 52, color: 'primary' },
    { vehiculo: 'SUV/Camionetas', servicios: 89, porcentaje: 32, color: 'success' },
    { vehiculo: 'Motos', servicios: 32, porcentaje: 11, color: 'warning' },
    { vehiculo: 'Camiones', servicios: 15, porcentaje: 5, color: 'danger' }
  ];

  const tiposServicio = [
    { servicio: 'Lavado Básico', cantidad: 120, porcentaje: 85, color: 'primary' },
    { servicio: 'Lavado Premium', cantidad: 85, porcentaje: 60, color: 'secondary' },
    { servicio: 'Encerado', cantidad: 45, porcentaje: 32, color: 'success' },
    { servicio: 'Detallado', cantidad: 31, porcentaje: 22, color: 'warning' }
  ];

  const ingresosPorDia = [
    { dia: 'Lunes', ingresos: 850, porcentaje: 40 },
    { dia: 'Martes', ingresos: 1200, porcentaje: 57 },
    { dia: 'Miércoles', ingresos: 980, porcentaje: 47 },
    { dia: 'Jueves', ingresos: 1450, porcentaje: 69 },
    { dia: 'Viernes', ingresos: 1650, porcentaje: 78 },
    { dia: 'Sábado', ingresos: 2100, porcentaje: 100 },
    { dia: 'Domingo', ingresos: 1890, porcentaje: 90 }
  ];

  const ordenesRecientes = [
    { 
      id: 'ORD-001', 
      cliente: 'Juan Pérez', 
      vehiculo: 'Auto', 
      servicio: 'Lavado Premium', 
      estado: 'En proceso', 
      precio: 25.00,
      avatar: 'JP'
    },
    { 
      id: 'ORD-002', 
      cliente: 'María García', 
      vehiculo: 'SUV', 
      servicio: 'Lavado Básico', 
      estado: 'Completado', 
      precio: 18.00,
      avatar: 'MG'
    },
    { 
      id: 'ORD-003', 
      cliente: 'Carlos López', 
      vehiculo: 'Moto', 
      servicio: 'Lavado Básico', 
      estado: 'En espera', 
      precio: 12.00,
      avatar: 'CL'
    },
    { 
      id: 'ORD-004', 
      cliente: 'Ana Martín', 
      vehiculo: 'Auto', 
      servicio: 'Detallado', 
      estado: 'En proceso', 
      precio: 45.00,
      avatar: 'AM'
    },
    { 
      id: 'ORD-005', 
      cliente: 'Luis Ruiz', 
      vehiculo: 'Camioneta', 
      servicio: 'Encerado', 
      estado: 'Completado', 
      precio: 35.00,
      avatar: 'LR'
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'completado':
        return 'success';
      case 'en proceso':
        return 'warning';
      case 'en espera':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getVehiculoEmoji = (vehiculo) => {
    switch (vehiculo.toLowerCase()) {
      case 'auto':
        return '🚗';
      case 'suv':
      case 'camioneta':
        return '🚙';
      case 'moto':
        return '🏍️';
      case 'camión':
        return '🚛';
      default:
        return '🚗';
    }
  };

  return (
    <div className="min-h-screen mb-5 min-w-full pr-6">
      {/* Header */}
      <div className="mb-2">
        {/* <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Autolavado</h1> */}
        {/* <p className="text-default-500">Panel de control y estadísticas del sistema</p> */}
      </div>
      {/* <DashboardTanques/> */}
      {/* Selector de tiempo */}
      <div className="mb-6">
        <ButtonGroup variant="flat">
          <Button 
            color={selectedTimeframe === 'day' ? 'primary' : 'default'}
            onClick={() => setSelectedTimeframe('day')}
          >
            Hoy
          </Button>
          <Button 
            color={selectedTimeframe === 'week' ? 'primary' : 'default'}
            onClick={() => setSelectedTimeframe('week')}
          >
            Esta Semana
          </Button>
          <Button 
            color={selectedTimeframe === 'month' ? 'primary' : 'default'}
            onClick={() => setSelectedTimeframe('month')}
          >
            Este Mes
          </Button>
        </ButtonGroup>
      </div>

      {/* Cards de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-warning">
          <CardBody className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-small text-default-500">Órdenes Abiertas</p>
                <p className="text-2xl font-bold text-warning">{stats.ordenesAbiertas}</p>
              </div>
              <div className="text-2xl">⏰</div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardBody className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-small text-default-500">Ingresos Hoy</p>
                <p className="text-2xl font-bold text-success">${stats.ingresosDiarios}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardBody className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-small text-default-500">Órdenes Completas</p>
                <p className="text-2xl font-bold text-primary">{stats.ordenesCompletas}</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardBody className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-small text-default-500">Clientes Atendidos</p>
                <p className="text-2xl font-bold text-secondary">{stats.clientesAtendidos}</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Gráficas representadas con Progress bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Ingresos por día */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">📈 Ingresos por Día</h3>
          </CardHeader>
          <CardBody className="gap-4">
            {ingresosPorDia.map((dia, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-small font-medium">{dia.dia}</span>
                  <span className="text-small text-default-500">${dia.ingresos}</span>
                </div>
                <Progress 
                  value={dia.porcentaje} 
                  color="primary" 
                  className="w-full"
                  size="sm"
                />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Servicios por tipo de vehículo */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">🚗 Servicios por Tipo de Vehículo</h3>
          </CardHeader>
          <CardBody className="gap-4">
            {serviciosPorVehiculo.map((vehiculo, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span>{getVehiculoEmoji(vehiculo.vehiculo)}</span>
                    <span className="text-small font-medium">{vehiculo.vehiculo}</span>
                  </div>
                  <span className="text-small text-default-500">{vehiculo.servicios} servicios</span>
                </div>
                <Progress 
                  value={vehiculo.porcentaje} 
                  color={vehiculo.color} 
                  className="w-full"
                  size="sm"
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Tipos de servicio más solicitados */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-lg font-semibold">🔧 Tipos de Servicio Más Solicitados</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiposServicio.map((servicio, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-small font-medium">{servicio.servicio}</span>
                  <span className="text-small text-default-500">{servicio.cantidad} veces</span>
                </div>
                <Progress 
                  value={servicio.porcentaje} 
                  color={servicio.color} 
                  className="w-full"
                  size="md"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Tabla de órdenes recientes */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">📋 Órdenes Recientes</h3>
        </CardHeader>
        <CardBody className="p-0">
          <Table aria-label="Tabla de órdenes recientes">
            <TableHeader>
              <TableColumn>ORDEN</TableColumn>
              <TableColumn>CLIENTE</TableColumn>
              <TableColumn>VEHÍCULO</TableColumn>
              <TableColumn>SERVICIO</TableColumn>
              <TableColumn>ESTADO</TableColumn>
              <TableColumn>PRECIO</TableColumn>
            </TableHeader>
            <TableBody>
              {ordenesRecientes.map((orden) => (
                <TableRow key={orden.id}>
                  <TableCell>
                    <span className="font-semibold">{orden.id}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar 
                        name={orden.avatar}
                        size="sm"
                        className="bg-primary text-primary-foreground"
                      />
                      <span>{orden.cliente}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{getVehiculoEmoji(orden.vehiculo)}</span>
                      <span>{orden.vehiculo}</span>
                    </div>
                  </TableCell>
                  <TableCell>{orden.servicio}</TableCell>
                  <TableCell>
                    <Chip 
                      color={getEstadoColor(orden.estado)} 
                      variant="flat" 
                      size="sm"
                    >
                      {orden.estado}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">${orden.precio.toFixed(2)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;