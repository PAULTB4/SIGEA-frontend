import React from 'react';
import { Input } from '../../../../components/ui';

const OrganizationDetails = ({ formData, handleInputChange }) => {
  return (
    <section>
      <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
        Detalles de Organización
      </h3>
      <div className="space-y-6">
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Organizador Principal</label>
            <input
                type="text"
                value={formData.primaryOrganizer}
                readOnly
                className="w-full px-4 py-3 rounded-lg text-gray-900 border bg-gray-100 opacity-75 cursor-not-allowed"
            />
        </div>
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Co-Organizador</label>
            <Input
                name="coOrganizer"
                value={formData.coOrganizer}
                onChange={handleInputChange}
                placeholder="Buscar Docente/Staff"
            />
        </div>
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Sponsor/Patrocinador</label>
            <Input
                name="sponsor"
                value={formData.sponsor}
                onChange={handleInputChange}
                placeholder="Entidades externas"
            />
        </div>
      </div>
    </section>
  );
};

export default OrganizationDetails;