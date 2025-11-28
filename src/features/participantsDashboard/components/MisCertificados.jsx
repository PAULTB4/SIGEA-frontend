// src/features/participantDashboard/components/MisCertificados.jsx
import React, { useState, useEffect } from 'react';
import { Award, Download, CheckCircle, ExternalLink } from 'lucide-react';
import participantService from '../../../services/participantService';
import { handleApiError, logError } from '../../../utils/errorHandler';

const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  LIGHT_ACCENT: '#A7D3EB',
  BRAND_ACCENT: '#59EBBF',
  CARD_BG: '#0F172A',
  TEXT_LIGHT: '#FFFFFF',
  TEXT_DARK: '#0F172A',
  BG_BASE: '#FFFFFF',
};

const MisCertificados = () => {
  const [error, setError] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await participantService.getMyCertificates();
      setCertificates(response.data || []);
    } catch (err) {
      logError(err, 'MisCertificados.loadCertificates');
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId) => {
    setDownloadingId(certificateId);
    setError(null);

    try {
      const result = await participantService.downloadCertificate(certificateId);
      if (result.success) {
        window.alert('Certificado descargado: ' + result.data.filename);
      }
    } catch (err) {
      logError(err, 'MisCertificados.handleDownload');
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleVerify = (certificateId) => {
    window.open(`/validation?cert=${certificateId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 rounded-lg animate-pulse"
            style={{ backgroundColor: COLORS.LIGHT_ACCENT + '33' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="p-6 rounded-lg border hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: COLORS.BG_BASE,
                borderColor: COLORS.LIGHT_ACCENT,
              }}
            >
              <div className="flex items-start gap-6">
                {/* Certificate Icon */}
                <div
                  className="p-4 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: COLORS.PRIMARY + '20' }}
                >
                  <Award size={32} style={{ color: COLORS.PRIMARY }} />
                </div>

                {/* Certificate Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: COLORS.TEXT_DARK }}
                      >
                        {certificate.title}
                      </h3>
                      <p
                        style={{ color: COLORS.LIGHT_ACCENT }}
                        className="text-sm mt-1"
                      >
                        {certificate.activityTitle}
                      </p>
                    </div>
                    <span
                      className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2"
                      style={{
                        backgroundColor: COLORS.SECONDARY + '20',
                        color: COLORS.SECONDARY,
                      }}
                    >
                      <CheckCircle size={16} />
                      {certificate.status}
                    </span>
                  </div>

                  {/* Certificate Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p
                        style={{ color: COLORS.TEXT_DARK }}
                        className="text-xs font-semibold mb-1"
                      >
                        Fecha de Emisión
                      </p>
                      <p
                        style={{ color: COLORS.PRIMARY }}
                        className="text-sm font-semibold"
                      >
                        {certificate.issueDate}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: COLORS.TEXT_DARK }}
                        className="text-xs font-semibold mb-1"
                      >
                        Código de Verificación
                      </p>
                      <p
                        style={{ color: COLORS.PRIMARY }}
                        className="text-sm font-mono"
                      >
                        {certificate.verificationCode}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ color: COLORS.TEXT_DARK }}
                        className="text-xs font-semibold mb-1"
                      >
                        Distribuido por
                      </p>
                      <p
                        style={{ color: COLORS.PRIMARY }}
                        className="text-sm capitalize"
                      >
                        {certificate.distributionMethod === 'email'
                          ? '📧 Email'
                          : '💬 WhatsApp'}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div
                    className="flex flex-wrap gap-3 pt-4 border-t"
                    style={{ borderColor: COLORS.LIGHT_ACCENT }}
                  >
                    <button
                      onClick={() => handleDownload(certificate.id)}
                      disabled={downloadingId === certificate.id}
                      className="px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-50"
                      style={{
                        backgroundColor: COLORS.SECONDARY,
                        color: COLORS.TEXT_LIGHT,
                      }}
                    >
                      <Download size={16} />
                      {downloadingId === certificate.id
                        ? 'Descargando...'
                        : 'DESCARGAR'}
                    </button>
                    <button
                      onClick={() => handleVerify(certificate.id)}
                      className="px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                      style={{
                        backgroundColor: COLORS.BRAND_ACCENT,
                        color: COLORS.TEXT_LIGHT,
                      }}
                    >
                      <ExternalLink size={16} />
                      VERIFICAR ONLINE
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                      style={{
                        backgroundColor: COLORS.PRIMARY + '20',
                        color: COLORS.PRIMARY,
                      }}
                    >
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 rounded-lg border"
          style={{
            backgroundColor: COLORS.BG_BASE,
            borderColor: COLORS.LIGHT_ACCENT,
            color: COLORS.TEXT_DARK,
          }}
        >
          <Award
            size={48}
            style={{ color: COLORS.PRIMARY }}
            className="mx-auto mb-4"
          />
          <p className="font-semibold mb-2">No tienes certificados aún</p>
          <p
            style={{ color: COLORS.PRIMARY }}
            className="text-sm"
          >
            Completa tus cursos e inscripciones pagadas para obtener
            certificados
          </p>
        </div>
      )}
    </div>
  );
};

export default MisCertificados;
