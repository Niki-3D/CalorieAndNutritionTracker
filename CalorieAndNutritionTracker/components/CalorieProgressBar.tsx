// components/CalorieProgressBar.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CalorieProgressBarProps {
  consumed: number;
  goal: number;
  percentage: number;
}

const CalorieProgressBar = ({ consumed, goal, percentage }: CalorieProgressBarProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Reset animations
    progressAnim.setValue(0);
    
    // Sequence of animations
    Animated.sequence([
      // First fade in and scale up
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      ]),
      // Then animate the progress bar
      Animated.timing(progressAnim, {
        toValue: Math.min(percentage, 100),
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      })
    ]).start();
  }, [percentage, consumed]);
  
  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: 'clamp'
  });
  
  // Determine color based on percentage
  const barColor = percentage > 100 
    ? "#FF3B30" // Over limit (red)
    : percentage > 90 
      ? "#FFCC00" // Near limit (yellow)
      : "#4CAF50"; // Good progress (green)

  const remaining = Math.max(0, goal - consumed);
  
  return (
    <Animated.View 
      style={[
        styles.wrapper,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={styles.textContainer}>
        <View style={styles.calorieInfo}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="flame" size={24} color="#4CAF50" style={styles.icon} />
            <Text style={styles.calorieNumber}>
              {Math.round(consumed)}
            </Text>
          </View>
          <Text style={styles.calorieLabel}>calories eaten</Text>
        </View>
        <View style={styles.calorieInfo}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="time" size={24} color="#666" style={styles.icon} />
            <Text style={[styles.calorieNumber, { color: remaining > 0 ? "#666" : "#FF3B30" }]}>
              {Math.round(remaining)}
            </Text>
          </View>
          <Text style={styles.calorieLabel}>remaining</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.backgroundBar} />
        <Animated.View 
          style={[
            styles.progressBar,
            { width, backgroundColor: barColor }
          ]}
        />
      </View>
      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>Daily Goal: {Math.round(goal)} calories</Text>
        <Text style={[styles.percentageText, { color: barColor }]}>
          {Math.round(percentage)}%
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 2,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calorieInfo: {
    alignItems: "center",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    marginRight: 4,
    fontSize: 20,
  },
  calorieNumber: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4CAF50",
  },
  calorieLabel: {
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  container: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  backgroundBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f0f0f0",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  goalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  goalText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  percentageText: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export default CalorieProgressBar;