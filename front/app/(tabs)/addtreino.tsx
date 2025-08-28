import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

interface Exercicio {
  id: number;
  nome: string;
  series?: string;
  repeticoes?: string;
  carga?: string;
  pch?: {
    id: number;
  };
}

interface PCH {
  id: number;
  nome: string;
}

const AddTreino = () => {
  const params = useLocalSearchParams();
  const [diaSemana, setDiaSemana] = useState("");
  const [pchId, setPchId] = useState("");
  const [pchList, setPchList] = useState<PCH[]>([]);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [selectedExercicios, setSelectedExercicios] = useState<Exercicio[]>([]);
  const [treinoId, setTreinoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const diasSemana = [
    { label: "Selecione o dia", value: "" },
    { label: "Segunda-feira", value: "1" },
    { label: "Terça-feira", value: "2" },
    { label: "Quarta-feira", value: "3" },
    { label: "Quinta-feira", value: "4" },
    { label: "Sexta-feira", value: "5" },
    { label: "Sábado", value: "6" },
    { label: "Domingo", value: "7" },
  ];

  useEffect(() => {
    // Carrega dados iniciais se for edição
    if (params.treinoId) {
      setTreinoId(params.treinoId as string);
      setDiaSemana(params.diaSemana as string);
      setPchId(params.pchId as string);
      if (params.exercicios) {
        try {
          setSelectedExercicios(JSON.parse(params.exercicios as string));
        } catch (e) {
          console.error("Erro ao parsear exercícios:", e);
        }
      }
    }

    // Carrega lista de PCHs
    fetchPCHs();
  }, []);

  useEffect(() => {
    if (pchId) {
      fetchExercicios();
    }
  }, [pchId]);

  const fetchPCHs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pch", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json();
      // Adiciona opção "Todos" no início
      setPchList([{ id: 0, nome: "Todos" }, ...(json.data || [])]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os grupos musculares.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExercicios = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/exercicios", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json();
      let filtrados = json.data;
      // Se não for "Todos", filtra pelo pchId
      if (pchId && pchId !== "0") {
        filtrados = filtrados.filter(
          (e: Exercicio) => String(e.pch?.id) === String(pchId)
        );
      }
      setExercicios(filtrados);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os exercícios.");
      console.error(error);
    }
  };

  const adicionarExercicio = (exercicio: Exercicio) => {
    if (selectedExercicios.some((e) => e.id === exercicio.id)) {
      Alert.alert("Aviso", "Este exercício já foi adicionado ao treino.");
      return;
    }
    setSelectedExercicios([
      ...selectedExercicios,
      {
        ...exercicio,
        series: "",
        repeticoes: "",
        carga: "",
      },
    ]);
  };

  const removerExercicio = (id: number) => {
    setSelectedExercicios(selectedExercicios.filter((e) => e.id !== id));
  };

  const atualizarCampo = (id: number, campo: string, valor: string) => {
    setSelectedExercicios((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [campo]: valor } : e))
    );
  };

  const salvarTreino = async () => {
    if (!diaSemana || !pchId || selectedExercicios.length === 0) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos e selecione pelo menos 1 exercício."
      );
      return;
    }

    const payload = {
      dia_semana: diaSemana,
      pch_id: pchId,
      exercicios: selectedExercicios.map((e) => ({
        exercicio_id: e.id,
        series: e.series,
        repeticoes: e.repeticoes,
        carga: e.carga,
      })),
    };

    try {
      setLoading(true);
      const url = treinoId
        ? `http://127.0.0.1:8000/api/treinos/${treinoId}`
        : "http://127.0.0.1:8000/api/treinos";

      const method = treinoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Alert.alert(
          "Sucesso",
          treinoId
            ? "Treino atualizado com sucesso!"
            : "Treino salvo com sucesso!"
        );
        if (!treinoId) {
          // Resetar campos se for novo treino
          setDiaSemana("");
          setPchId("");
          setSelectedExercicios([]);
          setExercicios([]);
          setTreinoId(null);
        }
        // Ir para a tela de treinos
        router.replace("/treinos"); // ajuste o path se necessário
      } else {
        const json = await res.json();
        console.error(json);
        Alert.alert(
          "Erro",
          json.message || "Não foi possível salvar o treino."
        );
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicao = () => {
    router.back();
  };

  if (loading && !pchList.length) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {treinoId ? "Editar Treino" : "Criar Novo Treino"}
      </Text>

      <Text style={styles.label}>Dia da Semana</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={diaSemana}
          onValueChange={setDiaSemana}
          style={styles.picker}
        >
          {diasSemana.map((d) => (
            <Picker.Item key={d.value} label={d.label} value={d.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Grupo Muscular (PCH)</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={pchId}
          onValueChange={setPchId}
          style={styles.picker}
          enabled={!treinoId} // Desabilita se for edição
        >
          <Picker.Item label="Selecione um grupo muscular" value="" />
          {pchList.map((pch) => (
            <Picker.Item
              key={pch.id}
              label={pch.nome}
              value={pch.id.toString()}
            />
          ))}
        </Picker>
      </View>

      {pchId && (
        <>
          <Text style={styles.label}>Exercícios Disponíveis</Text>
          {exercicios.map((ex) => (
            <TouchableOpacity
              key={ex.id}
              onPress={() => adicionarExercicio(ex)}
              style={styles.exercicioBtn}
            >
              <Text style={styles.exercicioText}>{ex.nome}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Exercícios Selecionados</Text>
          {selectedExercicios.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum exercício selecionado</Text>
          ) : (
            selectedExercicios.map((ex) => (
              <View key={ex.id} style={styles.exercicioBox}>
                <Text style={styles.exercicioNome}>{ex.nome}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Séries"
                  keyboardType="numeric"
                  value={ex.series}
                  onChangeText={(val) => atualizarCampo(ex.id, "series", val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Repetições"
                  keyboardType="numeric"
                  value={ex.repeticoes}
                  onChangeText={(val) =>
                    atualizarCampo(ex.id, "repeticoes", val)
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Carga (kg)"
                  keyboardType="numeric"
                  value={ex.carga}
                  onChangeText={(val) => atualizarCampo(ex.id, "carga", val)}
                />
                <TouchableOpacity
                  onPress={() => removerExercicio(ex.id)}
                  style={styles.removerBtn}
                >
                  <Text style={styles.removerText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={cancelarEdicao}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={salvarTreino}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {treinoId ? "Atualizar" : "Salvar"} Treino
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "#0f172a",
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 6,
  },
  pickerWrapper: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    color: "#fff",
    height: 50,
    backgroundColor: "transparent",
  },
  exercicioBtn: {
    backgroundColor: "#1e3a8a",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  exercicioText: {
    color: "#fff",
  },
  exercicioBox: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  exercicioNome: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#334155",
    color: "#fff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  removerBtn: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
  },
  removerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#64748b",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default AddTreino;
