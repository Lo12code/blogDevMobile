import { StyleSheet, View } from 'react-native';
import { Text } from "react-native-paper";


export default function PostsScreen(){
  return (
      <View style={styles.container}>
        <Text style={styles.title}>
          TESTANDO POSTS
        </Text>
      </View>
  )
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
