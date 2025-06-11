import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';

export default function HomePage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* LOGO */}
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />

        <Text style={styles.welcome}>Bem-vindo ao ProTreino</Text>
        <Text style={styles.subtitle}>Gerencie seus treinos e acompanhe seu progresso com facilidade.</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.linkText}>Criar uma conta</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    width: '100%',
    maxWidth: 400, // <- Define uma largura máxima
    alignSelf: 'center', // <- Garante que fique centralizado
  },
  
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center', // <- Centraliza a logo
  },

  welcome: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    alignSelf: 'center', // <- Centraliza o botão
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#60a5fa',
    fontSize: 15,
    marginTop: 8,
    alignSelf: 'center', // <- Centraliza o link
  },
});
