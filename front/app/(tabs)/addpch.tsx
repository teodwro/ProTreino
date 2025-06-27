import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { useRouter, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function AddPch() {
  const [nome, setNome] = useState("");
  const router = useRouter();

  const handleAdicionar = async () => {
    if (!nome) {
      Alert.alert("Erro", "Preencha o nome do grupo muscular");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        Alert.alert("Sucesso", data.message || "Grupo muscular cadastrado!");
        setNome("");
        router.back();
      } else {
        Alert.alert("Erro", data.message || data.error || "Erro ao cadastrar grupo muscular");
      }
    } catch (error) {
      console.error("Erro ao adicionar grupo muscular:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Adicionar Grupo de Exercício</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do grupo de Exercício"
          placeholderTextColor="#94a3b8"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>Voltar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 32 },
  input: {
    width: "100%",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: "#334155",
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: { color: "#3b82f6", marginTop: 8, fontSize: 15 },
});