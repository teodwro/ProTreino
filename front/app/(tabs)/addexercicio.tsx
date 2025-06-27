import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  View,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function AdicionarExercicio() {
  const [nome, setNome] = useState("");
  const [pchId, setPchId] = useState("");
  const [pchList, setPchList] = useState([]);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      fetch("http://127.0.0.1:8000/api/pch")
        .then((res) => res.json())
        .then((json) => setPchList(json.data || []))
        .catch(() => setPchList([]));
    }, [])
  );

  const handleAdicionar = async () => {
    if (!nome || !pchId) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/exercicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, pch_id: pchId }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Erro ao interpretar JSON:", error);
        Alert.alert("Erro", "Resposta inválida do servidor");
        return;
      }

      if (response.ok && data.status === "success") {
        Alert.alert(
          "Sucesso",
          data.message || "Exercício cadastrado com sucesso!"
        );
        setNome("");
        setPchId("");
        router.push("/exercicio");
      } else {
        Alert.alert("Erro", data.message || "Erro ao cadastrar exercício");
      }
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Adicionar Exercício</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do exercício"
          placeholderTextColor="#94a3b8"
          value={nome}
          onChangeText={setNome}
        />

        <View style={styles.pickerWrapper}>
          <Ionicons
            name="barbell-outline"
            size={22}
            color="#3b82f6"
            style={styles.pickerIcon}
          />
          <Picker
            selectedValue={pchId}
            onValueChange={(itemValue) => setPchId(itemValue)}
            style={styles.picker}
            dropdownIconColor="#3b82f6"
          >
            <Picker.Item
              label="Selecione o grupo muscular"
              value=""
              color="#94a3b8"
            />
            {pchList.map((pch) => (
              <Picker.Item
                key={pch.id}
                label={pch.nome}
                value={pch.id}
                color="#fff"
              />
            ))}
          </Picker>
        </View>

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
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: "#334155",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 64,
    borderRadius: 999,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#3b82f6",
    fontSize: 16,
    marginTop: 16,
  },
  pickerWrapper: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#334155",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 54,
  },
  pickerIcon: {
    marginRight: 8,
  },
  picker: {
    color: "#fff",
    flex: 1,
    height: 50,
    backgroundColor: "transparent",
  },
});
