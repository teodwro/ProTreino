import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

export const unstable_settings = {
  headerShown: false, // para esconder a header na tela
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      console.log('Preencha tudo')
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log('Status:', response.status);
      console.log('Texto da resposta:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Erro ao interpretar JSON:', e);
        Alert.alert('Erro', 'Resposta inválida do servidor');
        return;
      }

      if (response.ok && data.status === 'success') {
        console.log('Usuário:', data.data.user);
        console.log('Token:', data.data.token);

        Alert.alert('Sucesso', data.message || 'Login realizado com sucesso!');

        // Salvar token no storage, se desejar:
        // await AsyncStorage.setItem('token', data.data.token);

        // Limpa campos
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Erro', data.message || 'Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
          <StatusBar barStyle="light-content" />

          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/cadastro')}>
            <Text style={styles.linkText}>Criar uma conta</Text>
          </TouchableOpacity>
        </LinearGradient>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#334155',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 64,
    borderRadius: 999,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 16,
    marginTop: 16,
  },
});
