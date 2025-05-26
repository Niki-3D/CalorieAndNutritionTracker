import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.statusBarSpace} />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4CAF50",
    marginBottom: 10,
  },
  statusBarSpace: {
    height: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    padding: 15,
    paddingTop: 5,
    paddingBottom: 15,
  },
});

export default Header;