import { useColorScheme } from "react-native";

import { lightTheme, darkTheme } from "~/utils/theme";

function useTheme() {
  const deviceTheme = useColorScheme();
  return {
    theme: deviceTheme === "dark" ? darkTheme : lightTheme,
    colors: deviceTheme === "dark" ? darkTheme.colors : lightTheme.colors,
    isDark: deviceTheme === "dark",
  };
}

export default useTheme;
