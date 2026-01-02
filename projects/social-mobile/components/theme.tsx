import { StyleSheet } from "react-native";

export const colors = {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#C13584", // instagram-ish magenta
    instagramGradient: ["#405DE6", "#833AB4", "#C13584", "#FD1D1D", "#F58529"],
    danger: "#e53e3e",
    muted: "rgba(102,102,102,0.5)",
    text: "#111111",
    subtleText: "#666666",
    grey: "#888888",
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
};

export const radius = {
    sm: 6,
    round: 48,
};

export const fontSizes = {
    title: 18,
    subtitle: 16,
    body: 16,
    small: 14,
    avatar: 21,
};

// ここから追加：タブバー用の色定義
export const tabBar = {
    activeTint: colors.primary,
    inactiveTint: colors.subtleText,
    background: colors.surface,
    borderTopColor: colors.muted,
};

export const globalStyles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.background,
    },
    card: {
        backgroundColor: colors.surface,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomWidth: 1,
        borderColor: colors.muted,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});
