import { useApp } from "@/components/app-context";
import { colors } from "@/components/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const { auth, setAuth, api } = useApp();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        const res = await fetch(`${api}/users/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-type": "application/json",
            },
        });
        if (!res.ok) {
            alert("Unable to login");
            return;
        }
        const { user, token } = await res.json();
        setAuth(user);
        await AsyncStorage.setItem("token", token);
        router.push("/");
    };

    const logout = async () => {
        setAuth(undefined);
        setUsername("");
        setPassword("");
        await AsyncStorage.removeItem("token");
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                Profile Page
            </Text>
            {auth ? (
                <View
                    style={{ margin: 10, width: "80%", alignItems: "center" }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#111827",
                        }}
                    >
                        {auth.name}
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: "50%",
                            backgroundColor: colors.danger,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            alignItems: "center",
                            borderRadius: 15,
                            marginTop: 5,
                        }}
                        onPress={logout}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={{ margin: 10, width: "100%", alignItems: "center" }}
                >
                    <TextInput
                        placeholder="username"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                        value={username}
                        onBlur={() => setUsername((v) => v.trim())}
                        onChangeText={setUsername}
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            borderWidth: 1,
                            borderRadius: 5,
                            marginBottom: 10,
                            marginHorizontal: 10,
                            width: "80%",
                            borderColor: "#66666650",
                            fontSize: 16,
                            backgroundColor: "white",
                        }}
                    />
                    <TextInput
                        placeholder="password"
                        placeholderTextColor="gray"
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            borderWidth: 1,
                            borderRadius: 5,
                            marginBottom: 10,
                            marginHorizontal: 10,
                            width: "80%",
                            borderColor: "#66666650",
                            fontSize: 16,
                            backgroundColor: "white",
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            width: "80%",
                            backgroundColor: colors.primary,
                            paddingHorizontal: 14,
                            paddingVertical: 12,
                            alignItems: "center",
                            borderRadius: 15,
                            marginTop: 5,
                        }}
                        onPress={login}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
