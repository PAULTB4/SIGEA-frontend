import React from 'react';
import { Input } from '../../../../components/ui';

const ACTIVITY_TYPES = [
  { value: 'curso', label: 'Curso' },
  { value: 'taller', label: 'Taller' },
  { value: 'ciclo_conferencias', label: 'Ciclo de Conferencias' },
  { value: 'diplomado', label: 'Diplomado' }
];

const BasicInfo = ({ formData, handleInputChange, validationErrors }) => {
  return (
    <section>
      <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
        Datos Principales
      </h3>
      <div className="space-y-6">
        {/* Título */}
        <div>
           <label className="block text-sm font-semibold mb-2 text-gray-700">Título de la Actividad *</label>
           <Input
             type="text"
             name="title"
             value={formData.title}
             onChange={handleInputChange}
             placeholder="ej: Gestión Ágil de Proyectos TI"
             error={validationErrors.title}
           />
        </div>

        {/* Tipo */}
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Tipo de Actividad *</label>
            <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg text-gray-900 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                {ACTIVITY_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
             {validationErrors.type && <p className="text-xs mt-1 text-red-400">{validationErrors.type}</p>}
        </div>

        {/* Duración y Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Duración Estimada *</label>
                <Input
                    type="text"
                    name="estimatedDuration"
                    value={formData.estimatedDuration}
                    onChange={handleInputChange}
                    placeholder="ej: 40 horas"
                    error={validationErrors.estimatedDuration}
                />
            </div>
            {/* ... Inputs de Fecha Inicio y Fin (similar estructura) ... */}
             {/* Puedes simplificar usando el componente Input si soporta type="date"/"time" o manteniendo el HTML nativo con estilos */}
             <div>
                 <label className="block text-sm font-semibold mb-2 text-gray-700">Fecha de Inicio *</label>
                 <div className="flex gap-2">
                     <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                     />
                     <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="px-3 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 w-24"
                     />
                 </div>
                 {validationErrors.startDate && <p className="text-xs mt-1 text-red-400">{validationErrors.startDate}</p>}
             </div>
             {/* Repetir para Fecha Fin */}
             <div>
                 <label className="block text-sm font-semibold mb-2 text-gray-700">Fecha de Fin *</label>
                 <div className="flex gap-2">
                     <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                     />
                     <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="px-3 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 w-24"
                     />
                 </div>
                 {validationErrors.endDate && <p className="text-xs mt-1 text-red-400">{validationErrors.endDate}</p>}
             </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;