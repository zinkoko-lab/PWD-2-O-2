import AppProvider from "@/components/app-provider";
import { globalStyles } from "@/components/theme";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
    return (
        <View style={globalStyles.page}>
            <AppProvider>
                <Stack>
                    <Stack.Screen
                        name="(home)"
                        options={{ title: "Home", headerShown: false }}
                    />
                    <Stack.Screen
                        name="form"
                        options={{ presentation: "modal", title: "new post" }}
                    />
                    <Stack.Screen
                        name="view/[id]"
                        options={{ title: "Post Detail" }}
                    />
                </Stack>
            </AppProvider>
        </View>
    );
}
