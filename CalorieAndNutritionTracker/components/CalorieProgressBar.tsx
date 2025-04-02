// components/CalorieProgressBar.tsx
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

interface CalorieProgressBarProps {
  consumed: number;
  goal: number;
  percentage: number;
}

const CalorieProgressBar = ({ consumed, goal, percentage }: CalorieProgressBarProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);
  
  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  
  // Determine color based on percentage
  const barColor = percentage > 100 
    ? "#FF3B30" // Over limit (red)
    : percentage > 90 
      ? "#FFCC00" // Near limit (yellow)
      : "#4CAF50"; // Good progress (green)
  
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar} />
      <Animated.View 
        style={[
          styles.progressBar,
          { width, backgroundColor: barColor }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 12,
    borderRadius: 6,
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
    borderRadius: 6,
  },
});

export default CalorieProgressBar;