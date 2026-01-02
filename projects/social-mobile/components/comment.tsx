import { CommentType } from "@/types/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fontSizes, globalStyles, radius, spacing } from "./theme";

export default function Comment({ comment }: { comment: CommentType }) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View
                    style={[
                        styles.avatar,
                        {
                            backgroundColor: colors.muted,
                        },
                    ]}
                >
                    <Text style={styles.avatarText}>
                        {comment.user.name[0]}
                    </Text>
                </View>

                <View style={styles.meta}>
                    <Text selectable style={styles.userName}>
                        {comment.user.name}
                    </Text>
                    <Text selectable style={styles.time}>
                        {new Date(comment.createdAt).toLocaleString()}
                    </Text>
                    <Text selectable style={styles.body}>
                        {comment.content}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.card,
        backgroundColor: colors.surface,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
    },
    row: {
        flexDirection: "row",
        gap: spacing.sm,
        alignItems: "flex-start",
    } as any,
    avatar: {
        width: 40,
        height: 40,
        borderRadius: radius.round,
        // 背景色は動的に決めるためここではデフォルトを維持
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: colors.surface,
        fontSize: fontSizes.avatar - 2,
        fontWeight: "600",
    },
    meta: {
        flex: 1,
    },
    userName: {
        fontSize: fontSizes.subtitle,
        color: colors.text,
        fontWeight: "600",
    },
    time: {
        fontSize: fontSizes.small,
        color: colors.primary,
        marginTop: 2,
    },
    body: {
        marginTop: spacing.sm,
        fontSize: fontSizes.body,
        color: colors.text,
        lineHeight: 20,
    },
});
