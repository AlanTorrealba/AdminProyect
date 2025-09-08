import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Button,
  Badge,
  Chip,
  Divider
} from "@nextui-org/react";

// Componente individual de tanque
const TanqueAgua = ({ 
  id, 
  nombre, 
  nivelActual, 
  capacidadTotal, 
  estado = "normal", 
  ubicacion = "",
  className = "" 
}) => {
  const porcentaje = Math.min(100, Math.max(0, (nivelActual / capacidadTotal) * 100));
  
  const getColorByLevel = (nivel) => {
    if (nivel >= 80) return { water: "#3b82f6", bg: "#dbeafe", status: "success" };
    if (nivel >= 50) return { water: "#10b981", bg: "#d1fae5", status: "success" };
    if (nivel >= 30) return { water: "#f59e0b", bg: "#fef3c7", status: "warning" };
    return { water: "#ef4444", bg: "#fecaca", status: "danger" };
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "normal": return "success";
      case "mantenimiento": return "warning";
      case "critico": return "danger";
      case "offline": return "default";
      default: return "primary";
    }
  };

  const colors = getColorByLevel(porcentaje);

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start w-full">
          <div>
            <h4 className="font-bold text-large">{nombre}</h4>
            {ubicacion && <p className="text-small text-default-500">{ubicacion}</p>}
          </div>
          <Chip 
            color={getEstadoColor(estado)} 
            size="sm" 
            variant="flat"
          >
            {estado}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="flex flex-col items-center">
          {/* SVG del Tanque */}
          <div className="relative mb-4">
            <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
              {/* Definiciones para gradientes y efectos */}
              <defs>
                <linearGradient id={`waterGrad-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor={colors.water} stopOpacity="0.9" />
                  <stop offset="50%" stopColor={colors.water} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={colors.water} stopOpacity="0.5" />
                </linearGradient>
                
                <linearGradient id={`tankGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e5e7eb" />
                  <stop offset="50%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>

                {/* Patrón para el efecto de ondas */}
                <path id={`wave-${id}`} d="M0,5 Q5,0 10,5 T20,5" stroke={colors.water} strokeWidth="0.5" fill="none" opacity="0.3" />
                
                {/* Filtro para sombra interior */}
                <filter id={`innerShadow-${id}`}>
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="1" dy="1" result="offset"/>
                  <feFlood floodColor="#000000" floodOpacity="0.1"/>
                  <feComposite in2="offset" operator="in"/>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              
              {/* Cuerpo principal del tanque (cilindro) */}
              <rect x="20" y="20" width="80" height="120" rx="8" ry="8" 
                fill={`url(#tankGrad-${id})`} 
                stroke="#9ca3af" 
                strokeWidth="2"
                filter={`url(#innerShadow-${id})`}
              />
              
              {/* Tapa superior del tanque */}
              <ellipse cx="60" cy="20" rx="42" ry="12" 
                fill="#d1d5db" 
                stroke="#9ca3af" 
                strokeWidth="2"
              />
              
              {/* Nivel de agua */}
              <rect 
                x="22" 
                y={22 + (118 * (100 - porcentaje) / 100)} 
                width="76" 
                height={118 * porcentaje / 100} 
                rx="6" 
                ry="6" 
                fill={`url(#waterGrad-${id})`}
              />
              
              {/* Superficie del agua (elipse) */}
              {porcentaje > 0 && (
                <ellipse 
                  cx="60" 
                  cy={22 + (118 * (100 - porcentaje) / 100)} 
                  rx="38" 
                  ry="6" 
                  fill={colors.water}
                  opacity="0.8"
                />
              )}
              
              {/* Ondas en la superficie del agua */}
              {porcentaje > 0 && (
                <>
                  <use href={`#wave-${id}`} x="25" y={18 + (118 * (100 - porcentaje) / 100)} opacity="0.6" />
                  <use href={`#wave-${id}`} x="35" y={20 + (118 * (100 - porcentaje) / 100)} opacity="0.4" />
                  <use href={`#wave-${id}`} x="45" y={19 + (118 * (100 - porcentaje) / 100)} opacity="0.5" />
                </>
              )}
              
              {/* Indicadores de nivel en el tanque */}
              <g stroke="#9ca3af" strokeWidth="1" opacity="0.3">
                <line x1="15" y1="44" x2="25" y2="44" />
                <line x1="15" y1="68" x2="25" y2="68" />
                <line x1="15" y1="92" x2="25" y2="92" />
                <line x1="15" y1="116" x2="25" y2="116" />
                <line x1="95" y1="44" x2="105" y2="44" />
                <line x1="95" y1="68" x2="105" y2="68" />
                <line x1="95" y1="92" x2="105" y2="92" />
                <line x1="95" y1="116" x2="105" y2="116" />
              </g>
              
              {/* Tubería de salida */}
              <rect x="100" y="130" width="15" height="6" rx="3" fill="#9ca3af" />
              <circle cx="107" cy="133" r="2" fill="#6b7280" />
              
              {/* Base del tanque */}
              <rect x="15" y="145" width="90" height="8" rx="4" fill="#9ca3af" />
              <rect x="17" y="147" width="86" height="4" rx="2" fill="#d1d5db" />
            </svg>
            
            {/* Indicador de porcentaje sobre el tanque */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6">
              <Badge 
                content={`${porcentaje.toFixed(1)}%`} 
                color={colors.status}
                variant="solid"
                className="text-white font-bold"
              />
            </div>
          </div>
          
          <Divider className="mb-3" />
          
          {/* Información detallada */}
          <div className="w-full space-y-3">
            <Progress 
              value={porcentaje} 
              color={colors.status}
              size="lg"
              showValueLabel={true}
              className="w-full"
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 1
              }}
            />
            
            <div className="flex justify-between text-small">
              <span className="text-default-600">Actual:</span>
              <span className="font-semibold">{nivelActual.toLocaleString()} L</span>
            </div>
            
            <div className="flex justify-between text-small">
              <span className="text-default-600">Capacidad:</span>
              <span className="font-semibold">{capacidadTotal.toLocaleString()} L</span>
            </div>
            
            <div className="flex justify-between text-small">
              <span className="text-default-600">Disponible:</span>
              <span className="font-semibold text-primary">
                {(capacidadTotal - nivelActual).toLocaleString()} L
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// Componente principal del dashboard
const DashboardTanques = () => {
  const [tanques, setTanques] = useState([
    {
      id: 1,
      nombre: "Tanque Principal",
      nivelActual: 8500,
      capacidadTotal: 10000,
      estado: "normal",
      ubicacion: "Área Norte"
    },
    {
      id: 2,
      nombre: "Cisterna Reserva",
      nivelActual: 3200,
      capacidadTotal: 8000,
      estado: "normal",
      ubicacion: "Área Sur"
    },
    {
      id: 3,
      nombre: "Tanque Emergencia",
      nivelActual: 1200,
      capacidadTotal: 5000,
      estado: "critico",
      ubicacion: "Área Este"
    },
    {
      id: 4,
      nombre: "Cisterna Auxiliar",
      nivelActual: 0,
      capacidadTotal: 6000,
      estado: "mantenimiento",
      ubicacion: "Área Oeste"
    }
  ]);

  // Simulación de actualización de datos
  useEffect(() => {
    const interval = setInterval(() => {
      setTanques(prev => 
        prev.map(tanque => ({
          ...tanque,
          nivelActual: Math.max(0, tanque.nivelActual + (Math.random() - 0.5) * 200)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalCapacidad = tanques.reduce((sum, tanque) => sum + tanque.capacidadTotal, 0);
  const totalActual = tanques.reduce((sum, tanque) => sum + tanque.nivelActual, 0);
  const porcentajeTotal = (totalActual / totalCapacidad) * 100;

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          💧 Sistema de Tanques de Agua
        </h1>
        <p className="text-default-500">Monitoreo en tiempo real de niveles de agua</p>
      </div>

      {/* Resumen general */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-bold">📊 Resumen General</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{tanques.length}</p>
              <p className="text-small text-default-500">Total Tanques</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {totalCapacidad.toLocaleString()} L
              </p>
              <p className="text-small text-default-500">Capacidad Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {totalActual.toLocaleString()} L
              </p>
              <p className="text-small text-default-500">Agua Actual</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                {porcentajeTotal.toFixed(1)}%
              </p>
              <p className="text-small text-default-500">Nivel Promedio</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Progress 
              value={porcentajeTotal} 
              color={porcentajeTotal > 60 ? "success" : porcentajeTotal > 30 ? "warning" : "danger"}
              size="lg"
              showValueLabel={true}
              label="Nivel General del Sistema"
              className="w-full"
            />
          </div>
        </CardBody>
      </Card>

      {/* Grid de tanques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {tanques.map((tanque) => (
          <TanqueAgua
            key={tanque.id}
            {...tanque}
            className="hover:scale-105 transition-transform duration-200"
          />
        ))}
      </div>

      {/* Botones de control */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">🔧 Controles del Sistema</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3">
            <Button color="primary" variant="solid">
              🔄 Actualizar Datos
            </Button>
            <Button color="success" variant="flat">
              ✅ Activar Bomba
            </Button>
            <Button color="warning" variant="flat">
              ⚠️ Modo Mantenimiento
            </Button>
            <Button color="danger" variant="flat">
              🚨 Alarma General
            </Button>
            <Button color="secondary" variant="ghost">
              📊 Generar Reporte
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardTanques;