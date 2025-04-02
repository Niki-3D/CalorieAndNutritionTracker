// components/NutritionDonut.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { NutritionItem } from "../app/data/dailyData";

interface NutritionDonutProps {
  caloriesConsumed: number;
  caloriesGoal: number;
  nutrients: NutritionItem[];
}

const NutritionDonut = ({ caloriesConsumed, caloriesGoal, nutrients }: NutritionDonutProps) => {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.back(1.5),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  
  const size = 260;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate percentage filled of calorie goal
  const percentage = Math.min((caloriesConsumed / caloriesGoal) * 100, 100);
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          transform: [
            { rotate: rotation },
            { scale: scaleAnim }
          ] 
        }
      ]}
    >
      <Svg width={size} height={size}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#4CAF50"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percentage / 100) * circumference}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
      </Svg>
      
      {/* Center text */}
      <Animated.View 
        style={[
          styles.centerText,
          { transform: [{ rotate: Animated.multiply(rotationAnim, -1).interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
          }) }] }
        ]}
      >
        <Text style={styles.calorieCount}>{caloriesConsumed}</Text>
        <Text style={styles.calorieLabel}>calories</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
  },
  calorieCount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#333",
  },
  calorieLabel: {
    fontSize: 16,
    color: "#777",
    marginTop: -4,
  },
});

export default NutritionDonut;