import React, { useState, useLayoutEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useNavigation } from 'expo-router';

export default function Perfil() {
  const router = useRouter();
  const navigation = useNavigation();

  // Esconde o header padrão
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [nome, setNome] = useState('Francisco Detoni');
  const [email, setEmail] = useState('francisco@example.com');
  const [foto, setFoto] = useState(require('../../assets/images/logo.png'));

  // ...restante do código


  const handleSelecionarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto({ uri: result.assets[0].uri });
    }
  };

  const handleSalvar = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Logo centralizada e grande */}
      <View style={styles.logoContainer}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logoGrande} />

      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Informações do Perfil</Text>
        <Text style={styles.subtitulo}>Atualize seus dados pessoais e foto.</Text>

        <View style={styles.card}>
          <Image source={foto} style={styles.foto} />

          <View style={styles.botoesFoto}>
            <TouchableOpacity style={styles.botaoCinza} onPress={handleSelecionarFoto}>
              <Text style={styles.botaoTextoPequeno}>Selecionar nova foto</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor="#94a3b8"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.botaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 20,
    },
    logoGrande: {
      width: 180,
      height: 180,
      resizeMode: 'contain',
    },
    // ... restante dos estilos continua igual

  
  scroll: {
    padding: 24,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  botoesFoto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaoCinza: {
    backgroundColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  botaoTextoPequeno: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#0f172a',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  botaoSalvar: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
