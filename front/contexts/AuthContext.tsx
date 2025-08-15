import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      console.log('🔍 Carregando autenticação armazenada...');
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('auth_user');
      
      console.log('📱 Token armazenado:', storedToken ? 'Sim' : 'Não');
      console.log('👤 Usuário armazenado:', storedUser ? 'Sim' : 'Não');
      
      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        console.log('✅ Usuário carregado:', userData.name);
        setToken(storedToken);
        setUser(userData);
      } else {
        console.log('❌ Nenhuma autenticação armazenada encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar autenticação:', error);
    } finally {
      setIsLoading(false);
      console.log('🏁 Carregamento de autenticação concluído');
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token) {
      return false;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setUser(data.data.user);
          await AsyncStorage.setItem('auth_user', JSON.stringify(data.data.user));
          return true;
        }
      }
      
      // Se chegou aqui, o token é inválido
      await logout();
      return false;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      await logout();
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Tentando fazer login com:', email);
      
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('📡 Resposta da API:', data);

      if (response.ok && data.status === 'success') {
        const userData = data.data.user;
        const userToken = data.data.token;

        console.log('✅ Login bem-sucedido! Usuário:', userData.name);
        console.log('🔑 Token recebido:', userToken ? 'Sim' : 'Não');

        setUser(userData);
        setToken(userToken);

        await AsyncStorage.setItem('auth_token', userToken);
        await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
        
        console.log('💾 Dados salvos no AsyncStorage');

        return true;
      } else {
        console.log('❌ Login falhou:', data.message);
        throw new Error(data.message || 'Credenciais inválidas');
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        // Tenta fazer logout no servidor
        await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Erro no logout do servidor:', error);
    } finally {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('auth_user');
      setUser(null);
      setToken(null);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!token || !user) {
      return false;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        const updatedUser = data.data.user;
        setUser(updatedUser);
        await AsyncStorage.setItem('auth_user', JSON.stringify(updatedUser));
        return true;
      } else {
        throw new Error(data.message || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        const userData = data.data.user;
        setUser(userData);
        await AsyncStorage.setItem('auth_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
