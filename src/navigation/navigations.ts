import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Book } from "~/utils/types";

export type RootStackParamList = {
  Main: undefined;
  Details: { book: Book };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
