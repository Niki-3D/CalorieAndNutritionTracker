// app/index.tsx (Home screen)
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import CalorieProgressBar from "../components/CalorieProgressBar";
import NutritionDonut from "../components/NutritionDonut";
import MacroSummary from "../components/MacroSummary";
import NutrientsMissing from "../components/NutrientsMissing";
import MealsList from "../components/MealsList";
import { dailyData, DailyDataManager } from "./data/dailyData";
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [currentDailyData, setCurrentDailyData] = useState(dailyData);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadDailyData = async () => {
    try {
      console.log('Loading daily data in HomeScreen...');
      setIsLoading(true);
      const data = await DailyDataManager.load();
      console.log('Loaded data:', JSON.stringify(data, null, 2));
      
      if (isMounted.current) {
        setCurrentDailyData(data);
        console.log('State updated with new data');
      }
    } catch (error) {
      console.error('Error loading daily data:', error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  // Load data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen focused, loading data...');
      isMounted.current = true;
      loadDailyData();
      return () => {
        console.log('Screen unfocused');
        isMounted.current = false;
      };
    }, [])
  );

  useEffect(() => {
    if (!isLoading) {
      console.log('Starting animations...');
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
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
      ]).start(() => {
        console.log('Animations completed');
      });
    }
  }, [isLoading]);

  // Calculate values from sanitized data
  const consumed = Number(currentDailyData.caloriesConsumed);
  const goal = Number(currentDailyData.caloriesGoal);
  const caloriePercentage = Math.min(
    Math.round((consumed / goal) * 100),
    100
  );

  console.log('Rendering with values:', { consumed, goal, caloriePercentage });

  return (
    <View style={styles.container}>
      <Header title="Today" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[
          styles.calorieContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <CalorieProgressBar 
            percentage={caloriePercentage}
            consumed={consumed}
            goal={goal}
          />
        </Animated.View>
        
        <Animated.View style={[
          styles.nutritionContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <NutritionDonut 
            caloriesConsumed={consumed}
            caloriesGoal={goal}
            nutrients={currentDailyData.nutrients}
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
          <MacroSummary macros={currentDailyData?.macros || dailyData.macros} />
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
            <Text style={styles.seeAllButton}>See All</Text>
          </View>
          <NutrientsMissing nutrients={currentDailyData?.nutrients || []} />
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
          </View>
          <MealsList meals={currentDailyData?.meals || []} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  calorieContainer: {
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  nutritionContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  seeAllButton: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "500",
  },
});