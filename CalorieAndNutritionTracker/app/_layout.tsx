// app/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          flexDirection: "row",
          height: 85, 
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -5 },
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.activeIconContainer
            ]}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={focused ? "#FFFFFF" : "#777777"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.navText,
              focused && styles.activeNavText
            ]}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="meal"
        options={{
          title: "Meals",
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.activeIconContainer
            ]}>
              <Ionicons
                name={focused ? "restaurant" : "restaurant-outline"}
                size={22}
                color={focused ? "#FFFFFF" : "#777777"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.navText,
              focused && styles.activeNavText
            ]}>
              Meals
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={[
              styles.iconContainer,
              focused && styles.activeIconContainer
            ]}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={focused ? "#FFFFFF" : "#777777"}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[
              styles.navText,
              focused && styles.activeNavText
            ]}>
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
  },
  activeIconContainer: {
    backgroundColor: "#4CAF50",
    
  },
  navText: {
    fontSize: 12,
    color: "#777777",
  },
  activeNavText: {
    color: "#4CAF50",
    fontWeight: "bold",
  }
});