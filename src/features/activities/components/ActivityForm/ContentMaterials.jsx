import React, { useState } from 'react';
import { Upload, X } from 'lucide-react'; // Asumiendo lucide-react instalado

const ContentMaterials = ({ formData, handleInputChange, handleFileChange, removeFile, validationErrors }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files);
        }
    };

  return (
    <section>
      <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
        Contenido y Materiales
      </h3>
      <div className="space-y-6">
        <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Descripción *</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe el contenido..."
            />
            {validationErrors.description && <p className="text-xs mt-1 text-red-400">{validationErrors.description}</p>}
        </div>

        {/* File Upload UI */}
        <div>
             <label className="block text-sm font-semibold mb-2 text-gray-700">Subir Contenido</label>
             <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input-content')?.click()}
             >
                 <Upload className="mx-auto mb-3 text-blue-500" size={32} />
                 <p className="font-semibold text-gray-700">Arrastra archivos o haz clic</p>
                 <input
                    id="file-input-content"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                    accept=".pdf,.docx,.xlsx,.txt"
                 />
             </div>
             {/* Lista de archivos */}
             {formData.contentFiles.length > 0 && (
                 <div className="mt-4 space-y-2">
                     {formData.contentFiles.map(file => (
                         <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border-l-4 border-blue-500">
                             <span className="text-sm font-medium text-gray-700">{file.name}</span>
                             <button type="button" onClick={() => removeFile(file.id)} className="text-red-400 hover:text-red-600">
                                 <X size={16} />
                             </button>
                         </div>
                     ))}
                 </div>
             )}
        </div>
      </div>
    </section>
  );
};

export default ContentMaterials;