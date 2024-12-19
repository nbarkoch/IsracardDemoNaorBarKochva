import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BookInfo } from "../utils/types";

export type RootStackParamList = {
  Main: undefined;
  Details: { bookInfo: BookInfo };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
