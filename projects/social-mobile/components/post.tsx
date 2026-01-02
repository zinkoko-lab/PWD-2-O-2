import { PostType } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApp } from "./app-context";
import { colors, fontSizes, globalStyles, radius, spacing } from "./theme";

export default function Post({ post }: { post: PostType }) {
    const queryClient = useQueryClient();
    const { auth, api } = useApp();
    const likeToggle = async () => {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        await fetch(`${api}/posts/${post.id}/like`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await queryClient.invalidateQueries({
            queryKey: ["posts"],
        });

        await queryClient.invalidateQueries({
            queryKey: ["post", post.id],
        });
    };

    const isLiked = auth
        ? post.likes.some((like) => like.userId === auth.id)
        : false;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{post.user.name[0]}</Text>
                </View>
                <View style={styles.meta}>
                    <Text selectable style={styles.userName}>
                        {post.user.name}
                    </Text>
                    <Text selectable style={styles.time}>
                        {new Date(post.createdAt).toLocaleString()}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            router.push(`/view/${post.id}`);
                        }}
                    >
                        <Text selectable style={styles.content}>
                            {post.content}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {auth && (
                <View style={styles.actionsRow}>
                    <View style={styles.actionGroup}>
                        <TouchableOpacity
                            onPress={likeToggle}
                            style={styles.iconButton}
                        >
                            {isLiked ? (
                                <Ionicons
                                    name="heart"
                                    color={colors.danger}
                                    size={24}
                                />
                            ) : (
                                <Ionicons
                                    name="heart-outline"
                                    color={colors.danger}
                                    size={24}
                                />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.countText}>
                            {post.likes.length}
                        </Text>
                    </View>

                    <View style={styles.actionGroup}>
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/view/${post.id}`);
                            }}
                            style={styles.iconButton}
                        >
                            <Ionicons
                                name="chatbubble-outline"
                                color={colors.grey}
                                size={24}
                            />
                        </TouchableOpacity>
                        <Text style={styles.countText}>
                            {post.comments.length}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.card,
        backgroundColor: colors.surface,
    },
    headerRow: {
        flexDirection: "row",
        gap: spacing.sm,
    } as any, // RN currently doesn't have 'gap' on all versions; keep for modern RN or fallback
    avatar: {
        width: 48,
        height: 48,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: "#fff",
        fontSize: fontSizes.avatar,
        fontWeight: "600",
    },
    meta: {
        flexShrink: 1,
    },
    userName: {
        fontSize: fontSizes.title,
        color: colors.text,
        fontWeight: "600",
    },
    time: {
        color: colors.primary,
        fontSize: fontSizes.small,
        marginTop: 2,
    },
    content: {
        marginTop: spacing.sm,
        fontSize: fontSizes.body,
        color: colors.text,
        lineHeight: 22,
    },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: spacing.md,
    },
    actionGroup: {
        flexDirection: "row",
        gap: spacing.xs,
        alignItems: "center",
    } as any,
    iconButton: {
        padding: 6,
        borderRadius: radius.sm,
    },
    countText: {
        fontSize: fontSizes.body,
        color: colors.subtleText,
    },
});
