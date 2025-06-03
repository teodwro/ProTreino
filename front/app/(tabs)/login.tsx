import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Criar" onPress={() => router.push('/cadastro')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
});
