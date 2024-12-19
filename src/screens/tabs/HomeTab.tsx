import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { RootStackNavigationProp } from "../../navigation/navigations";

function HomeTab() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPress = () => {
    navigation.navigate("Details", { bookInfo: { name: "" } });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ textAlign: "center" }}>book info</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeTab;
