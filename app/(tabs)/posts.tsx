import { useRouter } from "expo-router";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { auth, database } from "../../firebase/config.js";

export default function PostsScreen(){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();


  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      if (!auth || !database) { // Verifica "database" agora
        setError("Erro na inicialização do Firebase. Tente reiniciar o app.");
        Alert.alert("Erro", "Não foi possível conectar ao Firebase.");
        return;
      }
      
      try {
        const postsRef = ref(database, 'posts');
        // const postsQuery = query(postsRef, orderByChild('createdAt'));
        
        const unsubscribe = onValue(postsRef, (snapshot) => {
          if (snapshot.exists()) {
            const postsData = snapshot.val();
            
            const postsArray = Object.keys(postsData).map(key => ({
              id: key,
              ...postsData[key]
            }));
            
            postsArray.sort((a, b) => {
              if (a.createdAt && b.createdAt) {
                return b.createdAt - a.createdAt;
              }
              return 0;
            });
            
            setPosts(postsArray);
          } else {
            setPosts([]);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching posts:", error);
          setError("Não foi possível carregar os posts. " + error.message);
          setLoading(false);
        });
        
        // Limpa o listener quando o componente é desmontado
        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up posts listener:", error);
        setError("Erro ao configurar o listener de posts.");
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const formatDate = (timestamp: string | number) => {
    if (!timestamp) return "Data desconhecida";
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPostItem = ({ item }) => (
    <Card style={styles.postCard} mode="outlined">
      <Card.Title 
        title={item.title} 
        subtitle={formatDate(item.createdAt)} 
      />
      <Card.Content>
        <Text>{item.text}</Text>
      </Card.Content>
    </Card>
  );


  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Posts
      </Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.emptyMessage}>Nenhum post encontrado.</Text>
      )}
      <Button
        mode="contained"
        onPress={() => router.push("/(tabs)/homePage")}
        disabled={loading}
        style={styles.button}
      >
        {loading ? <ActivityIndicator color="white" /> : "Return to home page"}
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
  postCard: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 24,
    color: '#888',
    fontSize: 16,
  },
});
