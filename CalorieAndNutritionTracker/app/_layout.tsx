// app/_layout.tsx
import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, StatusBar } from "react-native";

export default function AppLayout() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4CAF50"
        translucent={true}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 105,
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
            paddingBottom: 30,
            paddingTop: 15,
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
              <View style={styles.tabItem}>
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
                <Text style={[
                  styles.navText,
                  focused && styles.activeNavText
                ]}>
                  Home
                </Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="meal"
          options={{
            title: "Meals",
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
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
                <Text style={[
                  styles.navText,
                  focused && styles.activeNavText
                ]}>
                  Meals
                </Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>
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
                <Text style={[
                  styles.navText,
                  focused && styles.activeNavText
                ]}>
                  Profile
                </Text>
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 5,
  },
  activeIconContainer: {
    backgroundColor: "#4CAF50",
  },
  navText: {
    fontSize: 8,
    color: "#777777",
    marginTop: 3,
  },
  activeNavText: {
    color: "#4CAF50",
    fontWeight: "bold",
  }
});