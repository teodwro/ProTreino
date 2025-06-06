import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

export default function HomePage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* seu conteúdo da tela aqui */
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
          <StatusBar barStyle="light-content" />

          <Text style={styles.welcome}>Bem-vindo ao ProTreino</Text>
          <Text style={styles.subtitle}>Gerencie seus treinos e acompanhe seu progresso com facilidade.</Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Login</Text>
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
    alignItems: 'center',
    padding: 24,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 64,
    borderRadius: 999,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
