// app/index.tsx (Home screen)
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to Food Tracker</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});