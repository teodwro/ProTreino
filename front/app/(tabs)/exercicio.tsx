import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { router, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

export default function Exercicios() {
  const [exercicios, setExercicios] = useState([]);
  const [pchList, setPchList] = useState([]);
  const [pchFilter, setPchFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        fetch('http://127.0.0.1:8000/api/pch', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(json => setPchList(json.data || []))
          .catch(() => setPchList([]));
      }
    }, [token])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        setLoading(true);
        fetch('http://127.0.0.1:8000/api/exercicios', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(json => setExercicios(json.data || []))
          .catch(() => setExercicios([]))
          .finally(() => setLoading(false));
      }
    }, [token])
  );

  const exerciciosFiltrados = pchFilter
    ? exercicios.filter(e => String(e.pch?.id) === String(pchFilter))
    : exercicios;

  const handleExercisePress = (exerciseId) => {
    router.push({
      pathname: '/showexercicio',
      params: { id: exerciseId }
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Exercícios</Text>
        <Text style={styles.subtitle}>Gerencie seus exercícios e crie novos treinos personalizados.</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pchFilter}
            onValueChange={setPchFilter}
            style={styles.picker}
            dropdownIconColor="#3b82f6"
          >
            <Picker.Item label="Todos os grupos" value="" color="#94a3b8" />
            {pchList.map((pch) => (
              <Picker.Item key={pch.id} label={pch.nome} value={pch.id} color="#fff" />
            ))}
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={exerciciosFiltrados}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/exercicios/${item.id}`)} // caminho relativo à aba
              >
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardSubtitle}>{item.pch?.nome}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={() => router.push('/addexercicio')}>
          <Text style={styles.buttonText}>Adicionar Exercício</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerWrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#334155',
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
  },
});