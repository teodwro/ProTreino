import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    if (!name || !email || !password) {
        Alert.alert('Erro', 'Preencha todos os campos');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
        });

        const data = await response.json();
    if (response.ok) {
        Alert.alert('Sucesso', data.mensagem);
        setName('');
        setEmail('');
        setPassword('');
        } else {
        Alert.alert('Erro', data.message || 'Erro ao cadastrar');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Erro de conexão com o servidor');
    }

    
    // Limpa os campos
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="black"
        value={name}
        onChangeText={setName}
      />

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

      <Button title="Cadastrar" onPress={handleCadastro} />
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
