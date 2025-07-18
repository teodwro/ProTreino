import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Treino {
  id: number;
  dia_semana: string;
  created_at: string;
}

const TreinosScreen = () => {
  const [diaSemana, setDiaSemana] = useState('');
  const [treinos, setTreinos] = useState<Treino[]>([]);

  const API_URL = 'http://127.0.0.1:8000/api/treinos';

  useEffect(() => {
    buscarTreinos();
  }, []);

  const buscarTreinos = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setTreinos(json.data);
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    }
  };

  const salvarTreino = async () => {
    if (!diaSemana.trim()) {
      Alert.alert('Erro', 'Preencha o dia da semana.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ dia_semana: diaSemana }),
      });

      if (response.ok) {
        setDiaSemana('');
        buscarTreinos();
      } else {
        const erro = await response.json();
        console.error('Erro ao salvar treino:', erro);
        Alert.alert('Erro', 'Falha ao salvar treino.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletarTreino = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      buscarTreinos();
    } catch (error) {
      console.error('Erro ao deletar treino:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Treinos</Text>
        <Text style={styles.subtitle}>
          Cadastre os dias da semana dedicados aos seus treinos.
        </Text>

        <TextInput
          placeholder="Dia da Semana"
          placeholderTextColor="#94a3b8"
          value={diaSemana}
          onChangeText={setDiaSemana}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={salvarTreino}>
          <Text style={styles.buttonText}>Salvar Treino</Text>
        </TouchableOpacity>

        <FlatList
          data={treinos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.dia_semana}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletarTreino(item.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </LinearGradient>
    </>
  );
};

export default TreinosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
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
    paddingHorizontal: 10,
    lineHeight: 22,
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
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
