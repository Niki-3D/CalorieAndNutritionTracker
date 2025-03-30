import { Text, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

const foodItems = [
  { name: "Banana", calories: 105, servingSize: "1 medium (7-8\" long)", brand: "Chiquita" },
  { name: "Apple", calories: 95, servingSize: "1 medium (3\" diameter)", brand: "Gala" },
  { name: "Orange", calories: 62, servingSize: "1 medium (2-5/8\" diameter)", brand: "Navel" },
]


const FoodItem = ({ name, calories, servingSize, brand }) => {
  return (
    <View style={{
      backgroundColor: "gainsboro" , padding: 20, borderRadius: 10, flexDirection: "row", 
      alignItems: "center", justifyContent: "space-between"
      }}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ color: "dimgray" }} >{calories} cal, {servingSize}, {brand}</Text>
      </View>
      <EvilIcons name="plus" size={28} color="#378709" />
    </View>
  );
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 5,
      
      }}
    >

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Food Items</Text>
      {foodItems.map((item, index) => (
        <FoodItem key={index} {...item} />
      ))}
      <View style={{ height: 20 }} /> 


    </View>
  );
}
