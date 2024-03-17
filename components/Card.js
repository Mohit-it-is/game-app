import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}
export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4, // shodow for android specific
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 }, // shadow for ios specific
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});