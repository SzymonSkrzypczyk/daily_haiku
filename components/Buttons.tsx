import { useState, useRef } from "react";
import { View, Pressable, Animated } from "react-native";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ButtonsProps {
    color?: string;
    size?: number;
    shareFunction?: () => void;
}

export default function Buttons({ color, size, shareFunction }: ButtonsProps) {
    const [liked, setLiked] = useState<boolean>(false);
    const scaleAnimHeart = useRef(new Animated.Value(1)).current;
    const scaleAnimShare = useRef(new Animated.Value(1)).current;

    const animateButton = (animation: Animated.Value) => {
        Animated.sequence([
            Animated.spring(animation, {
                toValue: 1.5,
                useNativeDriver: true,
            }),
            Animated.spring(animation, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleLike = () => {
        setLiked(!liked);
        animateButton(scaleAnimHeart);
    };

    const handleShare = () => {
        animateButton(scaleAnimShare);
        shareFunction ? shareFunction() : alert("Sharing not implemented");
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={handleLike}>
                <Animated.View style={{ transform: [{ scale: scaleAnimHeart }] }}>
                    <Ionicons
                        name={liked ? "heart-sharp" : "heart-outline"}
                        size={size ?? 48}
                        color={liked ? "red" : color ?? "white"}
                    />
                </Animated.View>
            </Pressable>

            <Pressable style={styles.button} onPress={handleShare}>
                <Animated.View style={{ transform: [{ scale: scaleAnimShare }] }}>
                    <Ionicons name="share-outline" size={size ?? 48} color={color ?? "white"} />
                </Animated.View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        gap: 10,
    },
    button: {
        padding: 30,
    },
});
