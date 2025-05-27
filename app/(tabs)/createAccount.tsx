import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { auth } from "../../firebase/config";

export default function CreateAccountScreen() {
  const router = useRouter(); // 🚀 expo-router navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/login"); // ✅ navegação via expo-router
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Create Account</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={handleCreateAccount}
        disabled={loading}
        style={styles.button}
      >
        {loading ? <ActivityIndicator color="white" /> : "Sign Up"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
});
