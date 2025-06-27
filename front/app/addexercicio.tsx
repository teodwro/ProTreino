import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  View,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdicionarExercicio() {
  const [nome, setNome] = useState('');
  const [pch, setPch] = useState('');
  const router = useRouter();

  const handleAdicionar = async () => {
    if (!nome || !pch) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/exercicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adicione o token se sua API exigir autenticação
          // 'Authorization': `Bearer ${seuTokenAqui}`
        },
        body: JSON.stringify({ nome, pch }),
      });

      const text = await response.text();
      console.log('Status:', response.status);
      console.log('Resposta:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error('Erro ao interpretar JSON:', error);
        Alert.alert('Erro', 'Resposta inválida do servidor');
        return;
      }

      if (response.ok && data.status === 'success') {
        Alert.alert('Sucesso', data.message || 'Exercício cadastrado com sucesso!');
        setNome('');
        setPch('');
        router.push('/exercicio');
      } else {
        Alert.alert('Erro', data.message || 'Erro ao cadastrar exercício');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Adicionar Exercício</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do exercício"
          placeholderTextColor="#94a3b8"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Grupo muscular"
          placeholderTextColor="#94a3b8"
          value={pch}
          onChangeText={setPch}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Voltar</Text>
        </TouchableOpacity>
      </LinearGradient>
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
