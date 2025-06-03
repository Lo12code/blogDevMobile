import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";


export default function HomePageScreen() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Welcome to the blog!
            </Text>
            <Button
                mode="contained"
                onPress={() => router.push("/(tabs)/posts")}
                disabled={loading}
                style={styles.button}
            >
                {loading ? <ActivityIndicator color="white" /> : "Read posts"}
            </Button>
            <Button
                mode="contained"
                onPress={() => router.push("/(tabs)/createPost")}
                disabled={loading}
                style={styles.button}
            >
                {loading ? <ActivityIndicator color="white" /> : "Create Post"}
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
