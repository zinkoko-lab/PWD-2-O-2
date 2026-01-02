import { PostType } from "@/types/global";
import { Text, View } from "react-native";

export default function Post({ post }: { post: PostType }) {
    return (
        <View
            style={{
                flexDirection: "row",
                gap: 8,
                borderBottomWidth: 1,
                borderColor: "#66666650",
                paddingVertical: 20,
                paddingHorizontal: 15,
                backgroundColor: "white",
            }}
        >
            <View>
                <View
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 48,
                        backgroundColor: "green",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 21,
                        }}
                    >
                        {post.user.name[0]}
                    </Text>
                </View>
            </View>
            <View style={{ flexShrink: 1 }}>
                <Text selectable style={{ fontSize: 18 }}>
                    {post.user.name}
                </Text>
                <Text selectable style={{ color: "green" }}>
                    {new Date(post.createdAt).toLocaleString()}
                </Text>
                <Text selectable style={{ marginTop: 5, fontSize: 16 }}>
                    {post.content}
                </Text>
            </View>
        </View>
    );
}
