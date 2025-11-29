// src/features/participantDashboard/components/PaymentUI.jsx
import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import participantService from '../../../services/participantService';

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

const PaymentUI = ({ enrollmentId, activity, onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const paymentMethods = [
    {
      id: 'yape',
      name: 'Yape',
      description: 'Billetera digital Peruana',
      icon: '📱',
    },
    {
      id: 'plin',
      name: 'Plin',
      description: 'Sistema de pagos instantáneos Peruana',
      icon: '💳',
    },
    {
      id: 'stripe',
      name: 'Tarjeta de Crédito/Débito',
      description: 'Visa, Mastercard, American Express',
      icon: '💳',
    },
    {
      id: 'transfer',
      name: 'Transferencia Bancaria',
      description: 'Transferencia directa a cuenta bancaria',
      icon: '🏦',
    },
  ];

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) {
      setError('Por favor, selecciona un método de pago');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await participantService.submitPayment(enrollmentId, {
        method: selectedMethod,
        amount: activity.price,
      });

      if (result.success) {
        setSuccess(
          '¡Pago procesado exitosamente! Tu inscripción está confirmada.'
        );

        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(result.message || 'Error al procesar el pago');
      }
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between p-6 border-b"
        style={{ borderColor: COLORS.LIGHT_ACCENT }}
      >
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.TEXT_DARK }}
          >
            Confirmar Pago
          </h2>
          <p
            style={{ color: COLORS.PRIMARY }}
            className="text-sm mt-1"
          >
            Selecciona tu método de pago preferido
          </p>
        </div>
        <button
          onClick={onCancel}
          disabled={loading}
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: COLORS.LIGHT_ACCENT + '20',
            color: COLORS.PRIMARY,
          }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Error Alert */}
        {error && (
          <div
            className="p-4 rounded-lg flex items-start gap-3"
            style={{
              backgroundColor: '#DC2626' + '15',
              borderLeft: `4px solid #DC2626`,
            }}
          >
            <AlertCircle
              size={20}
              style={{ color: '#DC2626' }}
              className="flex-shrink-0 mt-0.5"
            />
            <p style={{ color: '#DC2626' }} className="text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div
            className="p-4 rounded-lg flex items-start gap-3"
            style={{
              backgroundColor: COLORS.SECONDARY + '15',
              borderLeft: `4px solid ${COLORS.SECONDARY}`,
            }}
          >
            <CheckCircle
              size={20}
              style={{ color: COLORS.SECONDARY }}
              className="flex-shrink-0 mt-0.5"
            />
            <p style={{ color: COLORS.SECONDARY }} className="text-sm">
              {success}
            </p>
          </div>
        )}

        {/* Order Summary */}
        <div
          className="p-4 rounded-lg border-2"
          style={{
            backgroundColor: COLORS.BG_BASE,
            borderColor: COLORS.LIGHT_ACCENT,
          }}
        >
          <h3
            className="font-bold mb-3"
            style={{ color: COLORS.TEXT_DARK }}
          >
            Resumen del Pedido
          </h3>
          <div
            className="space-y-2 mb-3 pb-3 border-b"
            style={{ borderColor: COLORS.LIGHT_ACCENT }}
          >
            <div className="flex justify-between text-sm">
              <span style={{ color: COLORS.TEXT_DARK }}>Evento:</span>
              <span
                style={{ color: COLORS.PRIMARY }}
                className="font-semibold"
              >
                {activity.title}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: COLORS.TEXT_DARK }}>Monto:</span>
              <span
                style={{ color: COLORS.BRAND_ACCENT }}
                className="font-semibold"
              >
                S/ {activity.price.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span
              style={{ color: COLORS.TEXT_DARK }}
              className="font-bold"
            >
              Total a Pagar:
            </span>
            <span
              style={{ color: COLORS.PRIMARY }}
              className="text-2xl font-bold"
            >
              S/ {activity.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3
            className="font-bold mb-4"
            style={{ color: COLORS.TEXT_DARK }}
          >
            Métodos de Pago Disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethod(method.id);
                  setError('');
                }}
                disabled={loading}
                className="p-4 rounded-lg border-2 transition-all text-left disabled:opacity-50"
                style={{
                  backgroundColor: COLORS.BG_BASE,
                  borderColor:
                    selectedMethod === method.id
                      ? COLORS.PRIMARY
                      : COLORS.LIGHT_ACCENT,
                  borderWidth: '2px',
                  boxShadow:
                    selectedMethod === method.id
                      ? `0 0 12px ${COLORS.PRIMARY}40`
                      : 'none',
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <p
                      className="font-bold"
                      style={{ color: COLORS.TEXT_DARK }}
                    >
                      {method.name}
                    </p>
                    <p
                      style={{ color: COLORS.LIGHT_ACCENT }}
                      className="text-sm"
                    >
                      {method.description}
                    </p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle
                      size={20}
                      style={{ color: COLORS.SECONDARY }}
                      className="flex-shrink-0 mt-1"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            backgroundColor: COLORS.LIGHT_ACCENT + '15',
            color: COLORS.TEXT_DARK,
            borderLeft: `4px solid ${COLORS.LIGHT_ACCENT}`,
          }}
        >
          <p className="font-semibold mb-2">Información Importante:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Tu pago será procesado de manera segura</li>
            <li>Recibirás un comprobante de pago por email</li>
            <li>
              Tu acceso al evento se activará inmediatamente después del pago
            </li>
            <li>
              Para cancelaciones, comunícate con nuestro equipo de soporte
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div
          className="flex gap-3 pt-4 border-t"
          style={{ borderColor: COLORS.LIGHT_ACCENT }}
        >
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            style={{
              backgroundColor: COLORS.LIGHT_ACCENT + '20',
              color: COLORS.PRIMARY,
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handlePaymentSubmit}
            disabled={loading || !selectedMethod}
            className="flex-1 px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.TEXT_LIGHT,
            }}
          >
            {loading ? 'Procesando Pago...' : 'PAGAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentUI;
