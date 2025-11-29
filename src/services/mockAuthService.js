

const MOCK_USERS = [
  {
    email: 'organizador@test.com',
    password: 'password123',
    role: 'organizador',
    fullName: 'Carlos Organizador',
    dni: '12345678'
  },
  {
    email: 'participante@test.com',
    password: 'password123',
    role: 'participante',
    fullName: 'Ana Participante',
    dni: '87654321'
  },
  {
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    fullName: 'Admin Sistema',
    dni: '11111111'
  }
];

const mockAuthService = {
  mockLogin: async (email, password) => {
    console.log('🔧 [MOCK] Login attempt:', { email });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject({ message: 'Email y contraseña son requeridos' });
          return;
        }

        const user = MOCK_USERS.find(u => u.email === email);
        
        if (!user || user.password !== password) {
          reject({ message: 'Credenciales incorrectas' });
          return;
        }

        const simulatedResponse = {
          success: true,
          token: `mock_jwt_token_${Date.now()}`,
          user: {
            id: `user_${Math.random().toString(36).substr(2, 9)}`,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            createdAt: new Date().toISOString()
          }
        };

        console.log('✅ [MOCK] Login successful:', simulatedResponse.user);
        resolve(simulatedResponse);
      }, 800);
    });
  },

  mockRegister: async (fullName, email, dni, password) => {
    console.log('🔧 [MOCK] Register attempt:', { fullName, email, dni });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!fullName || !email || !dni || !password) {
          reject({ message: 'Todos los campos son requeridos' });
          return;
        }

        const existingUser = MOCK_USERS.find(u => u.email === email);
        if (existingUser) {
          reject({ message: 'El email ya está registrado' });
          return;
        }

        const simulatedResponse = {
          success: true,
          token: `mock_jwt_token_${Date.now()}`,
          user: {
            id: `user_${Math.random().toString(36).substr(2, 9)}`,
            email: email,
            fullName: fullName,
            dni: dni,
            role: 'participante',
            createdAt: new Date().toISOString()
          }
        };

        console.log('✅ [MOCK] Registration successful:', simulatedResponse.user);
        resolve(simulatedResponse);
      }, 800);
    });
  },

  mockVerifyDNI: async (dni) => {
    console.log('🔧 [MOCK] Verify DNI:', { dni });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!dni || dni.length !== 8) {
          reject({ message: 'DNI inválido. Debe tener 8 dígitos' });
          return;
        }

        const user = MOCK_USERS.find(u => u.dni === dni);
        
        if (!user) {
          reject({ message: 'DNI no registrado en el sistema' });
          return;
        }

        console.log('✅ [MOCK] DNI verified, code sent to:', user.email);
        resolve({
          success: true,
          message: `Código de verificación enviado a ${user.email.substring(0, 3)}***`,
          recoveryToken: `recovery_${Date.now()}`
        });
      }, 800);
    });
  },

  mockVerifyCode: async (dni, code) => {
    console.log('🔧 [MOCK] Verify code:', { dni, code });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!dni || !code) {
          reject({ message: 'DNI y código son requeridos' });
          return;
        }

        if (code === '123456') {
          console.log('✅ [MOCK] Code verified successfully');
          resolve({
            success: true,
            message: 'Código verificado correctamente'
          });
        } else {
          reject({ message: 'Código incorrecto. Usa "123456" para testing.' });
        }
      }, 800);
    });
  },

  mockResetPassword: async (dni, newPassword) => {
    console.log('🔧 [MOCK] Reset password for DNI:', dni);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!dni || !newPassword) {
          reject({ message: 'DNI y contraseña nueva son requeridos' });
          return;
        }

        if (newPassword.length < 8) {
          reject({ message: 'La contraseña debe tener al menos 8 caracteres' });
          return;
        }

        console.log('✅ [MOCK] Password reset successful');
        resolve({
          success: true,
          message: 'Contraseña restablecida correctamente'
        });
      }, 800);
    });
  }
};

export default mockAuthService;