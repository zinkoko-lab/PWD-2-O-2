import Post from "@/components/post";
import { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const api = "http://192.168.10.101:8800";

export default function Profile() {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: async (): Promise<PostType[]> => {
            const res = await fetch(`${api}/posts`);
            return res.json();
        },
    });

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                }}
            >
                <Text style={{ color: "red" }}>{error.message}</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            {posts?.map((post) => {
                return <Post key={post.id} post={post} />;
            })}
        </ScrollView>
    );
}
