import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'rgb(255, 255, 255)'}}>HOME TESTE</Text>
      <Link style={{color: 'rgb(255, 255, 255)'}} href='/details'> View details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
