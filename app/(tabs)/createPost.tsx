import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { auth, db } from "../../firebase/config";


export default function CreatePostScreen() {
    const router = useRouter();
    const [postTitle, setPostTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState("");

    const handleGoBackButton = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/homePage");
        }
    };

    const handleSharePost = async () => {
        if (!auth || !db) {
            setError("Erro na inicialização do Firebase. Tente reiniciar o app.");
            Alert.alert("Erro", "Não foi possível conectar ao Firebase.");
            return;
        }

        if (!postTitle.trim() || !postText.trim()) {
            Alert.alert("Erro", "Por favor, preencha o título e o texto do post.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const user = auth.currentUser;
            
            const docRef = await addDoc(collection(db, "posts"), {
                title: postTitle,
                text: postText,
                createdAt: serverTimestamp(),
                userId: user ? user.uid : null,
            });

            console.log("Document written with ID: ", docRef.id);
            Alert.alert("Sucesso", "Post compartilhado!");
            
            setPostTitle("");
            setPostText("");
            handleGoBackButton();
            
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("Erro ao compartilhar o post. Tente novamente.");
            Alert.alert("Erro", "Não foi possível compartilhar o post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}> Create your post! </Text>
            <TextInput 
                style={styles.input}
                label="Title"
                value={postTitle}
                onChangeText={setPostTitle}
            />
            <TextInput 
                style={styles.input}
                label="Text"
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                style={styles.button}
                mode="contained"
                onPress={handleSharePost}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="white" /> : "Share post!"}
            </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={handleGoBackButton}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="white" /> : "Go back"}
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
