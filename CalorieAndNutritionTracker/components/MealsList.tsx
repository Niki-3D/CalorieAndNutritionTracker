// components/MealsList.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MealEntry } from "../app/data/dailyData";

interface MealsListProps {
  meals: MealEntry[];
}

const MealsList = ({ meals }: MealsListProps) => {
  // Improved time icon logic based on exact time
  const getTimeIcon = (timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0]);
    
    if (hour >= 5 && hour < 11) return "sunny-outline"; // Morning: 5am-11am
    if (hour >= 11 && hour < 14) return "restaurant-outline"; // Lunch: 11am-2pm
    if (hour >= 14 && hour < 17) return "cafe-outline"; // Afternoon snack: 2pm-5pm
    if (hour >= 17 && hour < 21) return "restaurant-outline"; // Dinner: 5pm-9pm
    return "ice-cream-outline"; // Late night: 9pm-5am
  };
  
  return (
    <View style={styles.container}>
      {meals.map((meal) => (
        <TouchableOpacity 
          key={meal.id}
          style={styles.mealCard}
          activeOpacity={0.7}
        >
          <View style={styles.mealIconContainer}>
            <Ionicons 
              name={getTimeIcon(meal.time)} 
              size={20} 
              color="#4CAF50" 
            />
          </View>
          
          <View style={styles.mealInfo}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealTime}>{meal.time}</Text>
            </View>
            
            <View style={styles.macrosContainer}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>{meal.calories}</Text>
                <Text style={styles.macroLabel}>cal</Text>
              </View>
              
              <View style={[styles.macroItem, styles.macroItemBorder]}>
                <Text style={[styles.macroValue, { color: "#3DD598" }]}>{meal.carbs}g</Text>
                <Text style={styles.macroLabel}>carbs</Text>
              </View>
              
              <View style={[styles.macroItem, styles.macroItemBorder]}>
                <Text style={[styles.macroValue, { color: "#FFB572" }]}>{meal.protein}g</Text>
                <Text style={styles.macroLabel}>protein</Text>
              </View>
              
              <View style={[styles.macroItem, styles.macroItemBorder]}>
                <Text style={[styles.macroValue, { color: "#9059FF" }]}>{meal.fat}g</Text>
                <Text style={styles.macroLabel}>fat</Text>
              </View>
            </View>
          </View>
          
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color="#ccc" 
            style={styles.chevron}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  mealCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  mealIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0FFF0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  mealInfo: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  mealTime: {
    fontSize: 14,
    color: "#777",
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroItem: {
    flex: 1,
    alignItems: "center",
  },
  macroItemBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  macroLabel: {
    fontSize: 12,
    color: "#777",
  },
  chevron: {
    marginLeft: 10,
  },
});

export default MealsList;