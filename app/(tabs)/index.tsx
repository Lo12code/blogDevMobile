import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'rgb(255, 255, 255)'}}>HOME TESTE</Text>
      <Link style={{color: 'rgb(255, 255, 255)'}} href='/(tabs)/details'> View details </Link>
      <Link style={{color: 'rgb(255, 255, 255)'}} href='/(tabs)/createAccount'> Create account </Link>
      <Link style={{color: 'rgb(255, 255, 255)'}} href='/(tabs)/login'> Sign in </Link>
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
