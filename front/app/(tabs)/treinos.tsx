import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

interface Treino {
  id: number;
  dia_semana: number;
  pch_id: number;
  pch: {
    id: number;
    nome: string;
  };
  exercicios: Array<{
    id: number;
    nome: string;
    pivot: {
      series: string;
      repeticoes: string;
      carga: string;
    };
  }>;
}

const TreinosScreen = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    buscarTreinos();
  }, []);

  const buscarTreinos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/treinos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setTreinos(json.data || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os treinos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectTreino = (treino: Treino) => {
    router.push({
      pathname: '/addTreino',
      params: {
        treinoId: treino.id.toString(),
        diaSemana: treino.dia_semana.toString(),
        pchId: treino.pch_id.toString(),
        exercicios: JSON.stringify(treino.exercicios.map(ex => ({
          id: ex.id,
          nome: ex.nome,
          series: ex.pivot.series,
          repeticoes: ex.pivot.repeticoes,
          carga: ex.pivot.carga
        })))
      }
    });
  };

  const getDiaSemana = (dia: number): string => {
    const dias = [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo'
    ];
    return dias[dia - 1] || '';
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Seus Treinos</Text>
        <Text style={styles.subtitle}>
          Toque no dia para editar ou adicionar exercícios.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loadingText} />
        ) : (
          <FlatList
            data={treinos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => onSelectTreino(item)}
              >
                <Text style={styles.cardText}>
                  {getDiaSemana(item.dia_semana)}
                </Text>
                <Text style={styles.cardSubtext}>
                  {item.pch?.nome || 'Sem grupo muscular'}
                </Text>
                <Text style={styles.cardSubtext}>
                  {item.exercicios.length} exercício{item.exercicios.length !== 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum treino cadastrado.</Text>
            }
          />
        )}
      </LinearGradient>
    </>
  );
};

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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#1e40af',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtext: {
    color: '#dbeafe',
    fontSize: 14,
    marginBottom: 2,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default TreinosScreen;