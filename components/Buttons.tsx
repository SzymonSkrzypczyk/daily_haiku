import { useState } from "react";
import { View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Sharing from 'expo-sharing';


interface ButtonsProps {
    color?: string;
    size?: number;
    shareFunction?: () => void;
}


export default function Buttons({color, size, shareFunction}: ButtonsProps){
    const [liked, setLiked] = useState<boolean>(false);

    return (
        <View
        style={styles.container}>
            <Pressable
            style={styles.button}
            onPress={() => setLiked(!liked)}
            >
                <Ionicons name={liked ? "heart-sharp": "heart-outline"} size={size ?? 48} color={liked ? "red" : color ?? "white"} />
            </Pressable>
            <Pressable
            style={styles.button}
            onPress={() => shareFunction ? shareFunction() : alert("Sharing not implemented")}
            >
                <Ionicons name="share-outline" size={size ?? 48} color={color ?? "white"} />
                
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
    }
});
