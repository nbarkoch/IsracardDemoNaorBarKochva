import { lightTheme, darkTheme } from "../utils/theme";
import { useColorScheme } from "react-native";

export function useTheme() {
  const deviceTheme = useColorScheme();
  return {
    theme: deviceTheme === "dark" ? darkTheme : lightTheme,
    colors: deviceTheme === "dark" ? darkTheme.colors : lightTheme.colors,
    isDark: deviceTheme === "dark",
  };
}
