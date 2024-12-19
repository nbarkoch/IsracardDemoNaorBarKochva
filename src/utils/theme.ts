export const lightTheme = {
  colors: {
    primary: "#000000",
    background: "#FFFFFF",
    card: "#F6F6F6",
    text: "#1A1A1A",
    border: "#D3D3D3",
    notification: "#FF4B4B",
    secondary: "#666666",
    highlight: "#F8F8F8",
    placeholder: "#999",
  },
} as const;

export const darkTheme = {
  colors: {
    primary: "#FFFFFF",
    background: "#1A1A1A",
    card: "#2D2D2D",
    text: "#F6F6F6",
    border: "#404040",
    notification: "#FF6B6B",
    secondary: "#A0A0A0",
    highlight: "#333333",
    placeholder: "#999",
  },
} as const;

export type Theme = typeof lightTheme;
export type ThemeColors = typeof lightTheme.colors;
