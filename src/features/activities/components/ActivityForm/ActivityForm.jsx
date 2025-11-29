// src/features/activities/components/ActivityForm/ActivityForm.jsx
import React from 'react';
import { useActivityForm } from '../../hooks/useActivityForm';
import BasicInfo from './BasicInfo';
import OrganizationDetails from './OrganizationDetails';
import ContentMaterials from './ContentMaterials';
import { Alert, Button } from '../../../../components/ui'; // Ajustar rutas
import styles from './activityForm.module.css';

const ActivityForm = ({ userEmail, onSuccess, editingActivityId, editingActivityData }) => {
  const {
    formData,
    loading,
    error,
    success,
    validationErrors,
    handleInputChange,
    handleFileChange,
    removeFile,
    handleSubmit
  } = useActivityForm(userEmail, onSuccess, editingActivityId, editingActivityData);

  return (
    <div className="rounded-3xl shadow-2xl overflow-hidden bg-white"> {/* O usar clases del styles */}
      <div className="p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          {editingActivityId ? 'Editar Actividad' : 'Registro de Nueva Actividad'}
        </h2>
        <p className="text-sm mb-8 text-gray-500">
          {editingActivityId ? 'Actualiza los detalles' : 'Completa el formulario'}
        </p>

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-8">
            <BasicInfo
                formData={formData}
                handleInputChange={handleInputChange}
                validationErrors={validationErrors}
            />
            
            {/* Aquí iría el CoverImageUpload si lo separas, o dentro de BasicInfo si prefieres */}
            
            <OrganizationDetails
                formData={formData}
                handleInputChange={handleInputChange}
            />
            
            <ContentMaterials
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                removeFile={removeFile}
                validationErrors={validationErrors}
            />

            <div className="pt-6 border-t border-gray-200">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-lg"
                >
                    {editingActivityId
                        ? (loading ? 'Actualizando...' : 'ACTUALIZAR ACTIVIDAD')
                        : (loading ? 'Registrando...' : 'REGISTRAR ACTIVIDAD')
                    }
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;