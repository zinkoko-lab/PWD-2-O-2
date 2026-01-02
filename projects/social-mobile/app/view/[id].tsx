import { useApp } from "@/components/app-context";
import Comment from "@/components/comment";
import { colors, fontSizes, globalStyles, spacing } from "@/components/theme";
import { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Detail() {
    const { auth, api } = useApp();
    const { id } = useLocalSearchParams();

    const {
        data: post,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["post", id],
        queryFn: async (): Promise<PostType> => {
            const res = await fetch(`${api}/posts/${id}`);
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={{ color: colors.danger }}>{error.message}</Text>
            </View>
        );
    }
    if (!post) {
        return (
            <View style={styles.container}>
                <Text style={{ color: colors.danger }}>Post not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <View
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 48,
                            backgroundColor: colors.primary,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: colors.surface,
                                fontSize: 21,
                            }}
                        >
                            {post.user.name[0]}
                        </Text>
                    </View>
                    <View style={{ flexShrink: 1 }}>
                        <Text selectable style={styles.title}>
                            {post.user.name}
                        </Text>
                        <Text selectable style={{ color: colors.primary }}>
                            {new Date(post.createdAt).toLocaleString()}
                        </Text>

                        <Text selectable style={styles.bodyText}>
                            {post.content}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Comment Input */}
            {auth && (
                <View style={{ margin: 10 }}>
                    <TextInput
                        placeholder="Your Reply..."
                        placeholderTextColor="gray"
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: colors.muted,
                            fontSize: 16,
                            backgroundColor: colors.surface,
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            alignItems: "center",
                            borderRadius: 15,
                            marginTop: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.surface,
                                fontSize: 16,
                                fontWeight: "bold",
                            }}
                        >
                            Add Comment
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Comments */}
            <View style={{ marginTop: 5 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Comments</Text>
                </View>
                {post.comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.page,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        borderBottomColor: colors.muted,
        borderBottomWidth: 1,
        backgroundColor: colors.surface,
    },
    title: {
        fontSize: fontSizes.title,
        color: colors.text,
        fontWeight: "700",
        marginBottom: 10,
    },
    icon: {
        color: colors.primary, // ここを Instagram風 primary に統一
    },
    bodyText: {
        fontSize: fontSizes.body,
        color: colors.text,
        lineHeight: 22,
    },
});
