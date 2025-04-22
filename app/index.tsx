import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import Timer from "./components/timer";

//Main Component
export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Timer />
    </SafeAreaView>
  );
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});