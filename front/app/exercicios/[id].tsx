import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../contexts/AuthContext';


type Exercicio = {
  id: number;
  nome: string;
  pch?: {
    id: number;
    nome: string;
  };
};

export default function ExercicioShow() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercicio, setExercicio] = useState<Exercicio | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [pchId, setPchId] = useState<number | null>(null);
  const [grupos, setGrupos] = useState<{ id: number; nome: string }[]>([]);

  // Estados para os campos editáveis
  const [nome, setNome] = useState('');

  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/exercicios/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setExercicio(json.data);
          setNome(json.data.nome || '');
          setPchId(json.data.pch?.id || null);
        } else {
          setExercicio(null);
        }
      })
      .catch(() => setExercicio(null))
      .finally(() => setLoading(false));

    fetch('http://127.0.0.1:8000/api/pch', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setGrupos(json.data || []))
      .catch((err) => console.log('Erro ao carregar grupos:', err));
  }, [id, token]);

  async function handleSave() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome é obrigatório.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/exercicios/${id}`, {
        method: 'PUT', // ou PATCH conforme seu backend
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          pch_id: pchId,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setExercicio(json.data);
        Alert.alert('Sucesso', 'Exercício atualizado!');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar exercício.');
      }
    } catch {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
    } finally {
      setSaving(false);
    }
  }
  
  async function handleDelete() {
  setDeleting(true);
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/exercicios/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      console.log('Exercício deletado com sucesso.');
      router.back(); // volta para a tela anterior
    } else {
      console.error('Erro ao deletar o exercício.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  } finally {
    setDeleting(false);
  }
}

  

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Detalhes do Exercício',
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#fff',
        }}
      />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
        <StatusBar barStyle="light-content" />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : exercicio ? (
          <View style={styles.content}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              editable={!saving && !deleting}
            />

            <Text style={styles.label}>Grupo Muscular:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={pchId}
                onValueChange={(itemValue) => setPchId(itemValue)}
                enabled={!saving && !deleting}
                dropdownIconColor="#fff"
                style={styles.picker}
              >
                <Picker.Item label="Selecione um grupo" value={null} />
                {grupos.map((grupo) => (
                  <Picker.Item key={grupo.id} label={grupo.nome} value={grupo.id} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={saving || deleting}
            >
              <Text style={styles.buttonText}>{saving ? 'Salvando...' : 'Salvar alterações'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
              disabled={saving || deleting}
            >
              <Text style={styles.buttonText}>{deleting ? 'Deletando...' : 'Deletar exercício'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} disabled={saving || deleting}>
              <Text style={styles.linkText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.error}>Exercício não encontrado.</Text>
        )}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    marginTop: 40,
  },
  label: {
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 12,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2563eb',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 16,
    marginTop: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
  },

  pickerWrapper: {
  backgroundColor: '#1e293b',
  borderRadius: 8,
  marginBottom: 24,
},
picker: {
  color: '#fff',
  height: 50,
  paddingHorizontal: 14,
},
});
