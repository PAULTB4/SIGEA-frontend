import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import participantService from '../services/participantService';
import { useNavigate, useSearchParams } from 'react-router-dom';

const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  LIGHT_ACCENT: '#A7D3EB',
  BRAND_ACCENT: '#59EBBF',
  CARD_BG: '#0F172A',
  TEXT_LIGHT: '#FFFFFF',
  TEXT_DARK: '#0F172A',
  BG_BASE: '#FFFFFF'
};

const ValidationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCertId = searchParams.get('cert') || '';

  const [certificateId, setCertificateId] = useState(initialCertId);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialCertId) {
      handleVerify(initialCertId);
    }
  }, [initialCertId]);

  const handleVerify = async (id) => {
    if (!id.trim()) {
      setError('Por favor, ingresa un código de certificado');
      return;
    }

    setLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      const result = await participantService.verifyCertificate(id);
      
      if (result.data) {
        setVerificationResult(result.data);
      } else {
        setError('Certificado no encontrado. Verifica el código e intenta nuevamente.');
      }
    } catch (err) {
      setError('Error al verificar el certificado. Intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify(certificateId);
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: COLORS.BG_BASE }}
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 font-semibold transition-colors"
          style={{ color: COLORS.PRIMARY }}
        >
          <ArrowLeft size={20} />
          Volver a Inicio
        </button>

        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.TEXT_DARK }}
          >
            Portal de Validación de Certificados
          </h1>
          <p style={{ color: COLORS.PRIMARY }} className="text-lg">
            SIGEA - Sistema de Gestión Académica y Certificación Digital
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {/* Search Card */}
        <div
          className="rounded-lg border shadow-lg p-8 mb-8"
          style={{
            backgroundColor: COLORS.CARD_BG,
            borderColor: COLORS.LIGHT_ACCENT
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: COLORS.TEXT_LIGHT }}>
            Verifica tu Certificado
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Field */}
            <div>
              <label style={{ color: COLORS.TEXT_LIGHT }} className="block text-sm font-semibold mb-3">
                Código de Certificado
              </label>
              <div className="relative">
                <Search
                  size={20}
                  style={{ color: COLORS.PRIMARY }}
                  className="absolute left-4 top-3"
                />
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => {
                    setCertificateId(e.target.value.toUpperCase());
                    setError('');
                  }}
                  placeholder="Ej: CERT-2024-001"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border text-lg"
                  style={{
                    borderColor: COLORS.LIGHT_ACCENT,
                    color: COLORS.TEXT_DARK
                  }}
                />
              </div>
              <p style={{ color: COLORS.LIGHT_ACCENT }} className="text-xs mt-2">
                Encontrarás este código en tu certificado o en el email de confirmación
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.TEXT_LIGHT
              }}
            >
              {loading ? 'Verificando...' : 'VERIFICAR CERTIFICADO'}
            </button>
          </form>

          {/* Error Alert */}
          {error && (
            <div
              className="mt-6 p-4 rounded-lg flex items-start gap-3"
              style={{
                backgroundColor: '#DC2626' + '15',
                borderLeft: `4px solid #DC2626`
              }}
            >
              <AlertCircle size={20} style={{ color: '#DC2626' }} className="flex-shrink-0 mt-0.5" />
              <p style={{ color: '#DC2626' }} className="text-sm">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div
            className="rounded-lg border shadow-lg overflow-hidden"
            style={{
              backgroundColor: COLORS.BG_BASE,
              borderColor: COLORS.SECONDARY,
              borderWidth: '2px'
            }}
          >
            {/* Header */}
            <div
              className="p-6 border-b flex items-center gap-3"
              style={{
                backgroundColor: COLORS.CARD_BG,
                borderColor: COLORS.LIGHT_ACCENT
              }}
            >
              <CheckCircle size={32} style={{ color: COLORS.SECONDARY }} />
              <div>
                <h3 className="text-xl font-bold" style={{ color: COLORS.TEXT_LIGHT }}>
                  Certificado Válido
                </h3>
                <p style={{ color: COLORS.LIGHT_ACCENT }} className="text-sm">
                  Este certificado ha sido validado exitosamente
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 space-y-6">
              {/* Holder Info */}
              <div>
                <p style={{ color: COLORS.TEXT_DARK }} className="text-xs font-semibold mb-2">
                  OTORGADO A
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: COLORS.PRIMARY }}
                >
                  {verificationResult.holder}
                </p>
              </div>

              {/* Certificate Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y" style={{ borderColor: COLORS.LIGHT_ACCENT }}>
                <div>
                  <p style={{ color: COLORS.TEXT_DARK }} className="text-xs font-semibold mb-2">
                    TÍTULO DEL CERTIFICADO
                  </p>
                  <p style={{ color: COLORS.PRIMARY }} className="text-sm font-semibold">
                    {verificationResult.title}
                  </p>
                </div>

                <div>
                  <p style={{ color: COLORS.TEXT_DARK }} className="text-xs font-semibold mb-2">
                    FECHA DE EMISIÓN
                  </p>
                  <p style={{ color: COLORS.PRIMARY }} className="text-sm font-semibold">
                    {verificationResult.issueDate}
                  </p>
                </div>

                <div>
                  <p style={{ color: COLORS.TEXT_DARK }} className="text-xs font-semibold mb-2">
                    CÓDIGO DE VALIDACIÓN
                  </p>
                  <p style={{ color: COLORS.BRAND_ACCENT }} className="text-sm font-mono font-bold">
                    {verificationResult.validationCode}
                  </p>
                </div>

                <div>
                  <p style={{ color: COLORS.TEXT_DARK }} className="text-xs font-semibold mb-2">
                    ESTADO
                  </p>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold inline-block"
                    style={{
                      backgroundColor: COLORS.SECONDARY,
                      color: COLORS.TEXT_LIGHT
                    }}
                  >
                    {verificationResult.status}
                  </span>
                </div>
              </div>

              {/* Info Notice */}
              <div
                className="p-4 rounded-lg text-sm"
                style={{
                  backgroundColor: COLORS.LIGHT_ACCENT + '15',
                  color: COLORS.TEXT_DARK,
                  borderLeft: `4px solid ${COLORS.LIGHT_ACCENT}`
                }}
              >
                <p className="font-semibold mb-2">Información Importante:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Este certificado es válido y ha sido emitido por SIGEA</li>
                  <li>Los datos mostrados corresponden al registro oficial</li>
                  <li>Para consultas adicionales, contacta a nuestro equipo de soporte</li>
                </ul>
              </div>

              {/* Download/Print Options */}
              <div className="flex gap-3">
                <button
                  className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: COLORS.PRIMARY,
                    color: COLORS.TEXT_LIGHT
                  }}
                >
                  Descargar Certificado
                </button>
                <button
                  className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: COLORS.PRIMARY + '20',
                    color: COLORS.PRIMARY
                  }}
                  onClick={() => window.print()}
                >
                  Imprimir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto mt-12 text-center">
        <p style={{ color: COLORS.TEXT_DARK }} className="text-sm">
          © 2025 SIGEA - Gestión Académica y Certificación Digital
        </p>
      </div>
    </div>
  );
};

export default ValidationPage;
