export const colors = {
  primary: "#171717",
  secondary: "#737373",
  tertiary: "#181716",
  neutral: "#797676",
  destructive: "#dc2626",
  background: "#fafafa",
  surface: "#ffffff",
  border: "#e5e5e5",
} as const;

export const primaryScale = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0a0a0a",
} as const;

export const typography = {
  headline: {
    family: "var(--font-heading)",
    weights: ["600", "700"] as const,
  },
  body: {
    family: "var(--font-sans)",
    weights: ["400", "500", "600"] as const,
  },
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.625rem",
  xl: "0.875rem",
  pill: "9999px",
} as const;
