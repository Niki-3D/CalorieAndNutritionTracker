import { Text, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';



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
      <View style={{
        backgroundColor: "gainsboro" , padding: 20, borderRadius: 10, flexDirection: "row", 
        alignItems: "center", justifyContent: "space-between"
        }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Pizza</Text>
          <Text style={{ color: "dimgray" }} >350 cal, 1 slice, Dominos</Text>
        </View>
        <EvilIcons name="plus" size={28} color="#378709" />
      </View>


    </View>
  );
}
