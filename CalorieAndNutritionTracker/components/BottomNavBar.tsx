import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

interface NavItemProps {
  title: string;
  iconName: string;
  isActive: boolean;
  onPress: () => void;
}

const NavItem = ({ title, iconName, isActive, onPress }: NavItemProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconAndText}>
        <Animated.View
          style={[
            styles.iconContainer,
            isActive && styles.activeIconContainer,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Ionicons
            name={iconName as any}
            size={24}
            color={isActive ? "#FFFFFF" : "#777777"}
          />
        </Animated.View>
        <Text style={[
          styles.navText,
          isActive && styles.activeNavText
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface BottomNavBarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const BottomNavBar = ({ activePage, onPageChange }: BottomNavBarProps) => {
  return (
    <View style={styles.container}>
      <NavItem
        title="Home"
        iconName="home"
        isActive={activePage === "home"}
        onPress={() => onPageChange("home")}
      />
      <NavItem
        title="Meals"
        iconName="restaurant"
        isActive={activePage === "meal"}
        onPress={() => onPageChange("meal")}
      />
      <NavItem
        title="Profile"
        iconName="person"
        isActive={activePage === "profile"}
        onPress={() => onPageChange("profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  iconAndText: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 6,
  },
  activeIconContainer: {
    backgroundColor: "#4CAF50",
  },
  navText: {
    fontSize: 9,
    color: "#777777",
    marginTop: 2,
  },
  activeNavText: {
    color: "#4CAF50",
    fontWeight: "bold",
  }
});

export default BottomNavBar;
