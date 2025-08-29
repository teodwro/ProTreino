import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../../contexts/AuthContext";

interface Treino {
  id: number;
  dia_semana: number;
  pch_id: number;
  pch?: { id: number; nome: string };
  exercicios: Array<{ id: number; nome: string; pivot: { series: string; repeticoes: string; carga: string } }>;
}

const ShowTreino = () => {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const [treino, setTreino] = useState<Treino | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/treinos/${id}`, {
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        const json = await res.json();
        setTreino(json.data);
      } catch (e) {
        console.error(e);
        Alert.alert("Erro", "Não foi possível carregar o treino");
      } finally {
        setLoading(false);
      }
    };
    fetchTreino();
  }, [id]);

  const getDiaSemana = (dia?: number) => {
    if (!dia) return "";
    const dias = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
    return dias[dia - 1] || "";
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
        ) : (
          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.title}>{getDiaSemana(treino?.dia_semana)}</Text>
            <Text style={styles.subtitle}>{treino?.pch?.nome || "Sem grupo muscular"}</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Exercícios</Text>
              {treino?.exercicios?.map((ex) => (
                <View key={ex.id} style={styles.item}>
                  <Text style={styles.itemTitle}>{ex.nome}</Text>
                  <Text style={styles.itemText}>Séries: {ex.pivot.series}</Text>
                  <Text style={styles.itemText}>Repetições: {ex.pivot.repeticoes}</Text>
                  {ex.pivot.carga ? <Text style={styles.itemText}>Carga: {ex.pivot.carga} kg</Text> : null}
                </View>
              ))}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push({
                    pathname: "/addTreino",
                    params: {
                      treinoId: String(treino?.id),
                      diaSemana: String(treino?.dia_semana),
                      pchId: String(treino?.pch_id),
                      exercicios: JSON.stringify(
                        treino?.exercicios?.map((ex) => ({ id: ex.id, nome: ex.nome, series: ex.pivot.series, repeticoes: ex.pivot.repeticoes, carga: ex.pivot.carga })) || []
                      ),
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  scroll: {
    paddingBottom: 60,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  itemTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  itemText: {
    color: "#cbd5e1",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondary: {
    backgroundColor: "#64748b",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default ShowTreino;


