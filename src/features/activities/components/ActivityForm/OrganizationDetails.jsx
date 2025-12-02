import React from 'react';
import { Input } from '../../../../components/ui';

const OrganizationDetails = ({ formData, handleInputChange }) => {
  return (
    <section>
      <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
        Detalles de Organización
      </h3>
      <div className="space-y-6">
        {/* Organizador Principal */}
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Organizador Principal
            </label>
            <input
                type="text"
                value={formData.primaryOrganizer}
                readOnly
                className="w-full px-4 py-3 rounded-lg text-gray-900 border bg-gray-100 opacity-75 cursor-not-allowed"
            />
            <p className="text-xs mt-1 text-gray-500">
              Este campo se completa automáticamente con tu correo
            </p>
        </div>

        {/* Co-Organizador */}
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Co-Organizador
            </label>
            <Input
                name="coOrganizer"
                value={formData.coOrganizer}
                onChange={handleInputChange}
                placeholder="Buscar Docente/Staff"
            />
            <p className="text-xs mt-1 text-gray-500">
              Opcional - Correo o nombre del co-organizador
            </p>
        </div>

        {/* Sponsor/Patrocinador */}
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Sponsor/Patrocinador
            </label>
            <Input
                name="sponsor"
                value={formData.sponsor}
                onChange={handleInputChange}
                placeholder="Entidades externas"
            />
            <p className="text-xs mt-1 text-gray-500">
              Opcional - Nombre de la entidad patrocinadora
            </p>
        </div>

        {/* Ubicación */}
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Ubicación
            </label>
            <Input
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                placeholder="ej: Aula 101, Auditorio Principal"
            />
            <p className="text-xs mt-1 text-gray-500">
              Opcional - Lugar donde se realizará la actividad
            </p>
        </div>

        {/* Número Yape */}
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Número Yape
            </label>
            <Input
                name="numeroYape"
                value={formData.numeroYape}
                onChange={handleInputChange}
                placeholder="ej: 987654321"
                type="tel"
            />
            <p className="text-xs mt-1 text-gray-500">
              Opcional - Número para pagos vía Yape
            </p>
        </div>
      </div>
    </section>
  );
};

export default OrganizationDetails;