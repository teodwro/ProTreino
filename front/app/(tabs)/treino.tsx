import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Treinos</Text>

      <TextInput
        placeholder="Dia da Semana"
        value={diaSemana}
        onChangeText={setDiaSemana}
        style={styles.input}
      />

      <Button title="Salvar Treino" onPress={salvarTreino} />

      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.treinoItem}>
            <Text>{item.dia_semana}</Text>
            <Button title="Excluir" onPress={() => deletarTreino(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default TreinosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  treinoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
});
