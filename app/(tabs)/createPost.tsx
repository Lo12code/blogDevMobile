import { useRouter } from "expo-router";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { auth, database } from "../../firebase/config";


export default function CreatePostScreen() {
    const router = useRouter();
    const [postTitle, setPostTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState("");

    const handleSharePost = async () => {
        // Verifique se Firebase inicializou corretamente
        if (!auth || !database) { // Verifica "database" agora
            setError("Erro na inicialização do Firebase. Tente reiniciar o app.");
            Alert.alert("Erro", "Não foi possível conectar ao Firebase.");
            return;
        }

        const user = auth.currentUser;
        // Verifica se o usuário está logado (necessário para as regras)
        if (!user) {
            setError("Você precisa estar logado para postar.");
            Alert.alert("Erro", "Usuário não autenticado.");
            // Opcional: redirecionar para login
            router.push("/(tabs)/login"); 
            return;
        }

        if (!postTitle.trim() || !postText.trim()) {
            Alert.alert("Erro", "Por favor, preencha o título e o texto do post.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // 1. Obtenha uma referência para o nó "posts"
            const postsRef = ref(database, "posts");
            // 2. Crie uma nova chave única para o post usando push()
            const newPostRef = push(postsRef);
            // 3. Defina os dados do post nessa nova referência usando set()
            await set(newPostRef, {
                title: postTitle,
                text: postText,
                createdAt: serverTimestamp(), // Timestamp do Realtime DB
                userId: user.uid, // Guarda o ID do usuário
                // Adicione outros campos se necessário (ex: userEmail: user.email)
            });

            console.log("Post added successfully with key: ", newPostRef.key);
            Alert.alert("Sucesso", "Post compartilhado!");
            
            setPostTitle("");
            setPostText("");
            handleGoBackButton();

        } catch (e) {
            console.error("Error adding post: ", e);
            // Verifica se o erro é de permissão (pode ser mais específico)
            if (e.message.includes("permission_denied")) {
                 setError("Erro de permissão. Verifique suas regras ou se seu usuário existe em /usuarios.");
                 Alert.alert("Erro", "Permissão negada para salvar o post.");
            } else {
                 setError("Erro ao compartilhar o post. Tente novamente.");
                 Alert.alert("Erro", "Não foi possível compartilhar o post.");
            }
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
                onPress={() => router.push("/(tabs)/homePage")}
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
