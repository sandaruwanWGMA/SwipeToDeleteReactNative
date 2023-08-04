import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SwipeToDelete from './SwipeToDelete';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SwipeToDelete></SwipeToDelete>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
