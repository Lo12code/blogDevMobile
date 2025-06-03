import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOME TESTE</Text>
      <Button
        mode="contained"
        onPress={() => router.push("/(tabs)/createAccount")}
        style={styles.button}
      >
        {loading ? <ActivityIndicator color="white" /> : "Criar conta"}
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push("/(tabs)/login")}
        style={styles.button}
      >
        {loading ? <ActivityIndicator color="white" /> : "Login"}
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
  link: {
    marginTop: 12,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
});
