// app/index.tsx (Home screen)
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import CalorieProgressBar from "../components/CalorieProgressBar";
import NutritionDonut from "../components/NutritionDonut";
import MacroSummary from "../components/MacroSummary";
import NutrientsMissing from "../components/NutrientsMissing";
import MealsList from "../components/MealsList";
import { dailyData } from "./data/dailyData";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const caloriePercentage = Math.min(
    (dailyData.caloriesConsumed / dailyData.caloriesGoal) * 100, 
    100
  );

  return (
    <View style={styles.container}>
      <Header title="Daily Summary" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[
          styles.streakContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.streakIconContainer}>
            <Ionicons name="flame" size={22} color="#FF9500" />
          </View>
          <Text style={styles.streakText}>
            {dailyData.streak} day streak! Keep it up!
          </Text>
        </Animated.View>
        
        <Animated.View style={[
          styles.sectionContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={styles.sectionTitle}>Daily Calories</Text>
          <CalorieProgressBar 
            consumed={dailyData.caloriesConsumed} 
            goal={dailyData.caloriesGoal} 
            percentage={caloriePercentage}
          />
          
          <View style={styles.calorieTextContainer}>
            <Text style={styles.calorieText}>
              <Text style={styles.highlightedText}>{dailyData.caloriesConsumed}</Text> 
              <Text style={styles.subText}> / {dailyData.caloriesGoal} kcal</Text>
            </Text>
            <Text style={styles.remainingText}>
              {dailyData.caloriesGoal - dailyData.caloriesConsumed} kcal remaining
            </Text>
          </View>
        </Animated.View>
        
        <Animated.View style={[
          styles.nutritionContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <NutritionDonut 
            caloriesConsumed={dailyData.caloriesConsumed}
            caloriesGoal={dailyData.caloriesGoal}
            nutrients={dailyData.nutrients}
          />
        </Animated.View>
        
        <Animated.View style={[
          styles.sectionContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={styles.sectionTitle}>Macronutrients</Text>
          <MacroSummary macros={dailyData.macros} />
        </Animated.View>
        
        <Animated.View style={[
          styles.sectionContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nutrients Needed</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <NutrientsMissing nutrients={dailyData.nutrients} />
        </Animated.View>
        
        <Animated.View style={[
          styles.sectionContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>Add Meal</Text>
            </TouchableOpacity>
          </View>
          <MealsList meals={dailyData.meals} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5E6",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
  },
  streakIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFEACC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9500",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAllButton: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
  },
  nutritionContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  calorieTextContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  calorieText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  highlightedText: {
    fontWeight: "700",
    color: "#4CAF50",
  },
  subText: {
    color: "#777",
  },
  remainingText: {
    fontSize: 14,
    color: "#777",
  },
});