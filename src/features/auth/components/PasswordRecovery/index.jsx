import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import StepDni from './StepDNI';
import StepCode from './StepCODE';
import StepNewPassword from './StepNewPassword';
import styles from './passwordRecovery.module.css';

export const PasswordRecovery = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [recoveryData, setRecoveryData] = useState({
    dni: '',
    code: ''
  });

  const handleStepComplete = (data) => {
    setRecoveryData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setRecoveryData({ dni: '', code: '' });
    onBack();
  };

  return (
    <div className={styles.recoveryContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button
          onClick={handleReset}
          className={styles.backButton}
        >
          <ArrowLeft size={16} />
          Volver
        </button>
        
        <h2 className={styles.title}>
          Recuperar Contraseña
        </h2>

        {/* Stepper */}
        <div className={styles.stepper}>
          {[1, 2, 3].map((step, idx) => (
            <div key={step} className={styles.stepWrapper}>
              <div
                className={`${styles.stepCircle} ${
                  currentStep >= step ? styles.stepActive : ''
                } ${currentStep === step ? styles.stepCurrent : ''}`}
              >
                {currentStep > step ? (
                  <CheckCircle size={24} />
                ) : (
                  step
                )}
              </div>
              <p className={styles.stepLabel}>
                {step === 1 && 'Verificación'}
                {step === 2 && 'Código'}
                {step === 3 && 'Contraseña'}
              </p>
              
              {/* Connector line */}
              {idx < 2 && (
                <div
                  className={`${styles.stepConnector} ${
                    currentStep > step ? styles.connectorActive : ''
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className={styles.stepContent}>
        {currentStep === 1 && <StepDni onComplete={handleStepComplete} />}
        {currentStep === 2 && <StepCode dni={recoveryData.dni} onComplete={handleStepComplete} />}
        {currentStep === 3 && <StepNewPassword dni={recoveryData.dni} onComplete={handleReset} />}
      </div>
    </div>
  );
};

export default PasswordRecovery;