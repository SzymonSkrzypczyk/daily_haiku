import { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import { View, Text, StyleSheet } from "react-native";
import Buttons from "@/components/Buttons";
import * as Sharing from 'expo-sharing';
import { useSharedState } from '@/context/SharedStateContext';

export default function Index() {
    const { isDark } = useSharedState();  // Access dark mode state from context
    
    const haikuRef = useRef<View>(null);

    const [haiku, setHaiku] = useState<string[]>([
        "A world of dew", 
        "And within every dewdrop", 
        "A world of struggle."
    ]);

    const onHaikuShare = async () => {
        try {
            const localUri = await captureRef(haikuRef, {
                height: 440,
                quality: 1,
            });
            
            await Sharing.shareAsync(localUri);
            if (!localUri) {
                alert('Error while sharing your Haiku!');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
            <View style={styles.innerContainer}>
                <View ref={haikuRef} collapsable={false}>
                    {haiku.map((line, index) => (
                        <Text key={index} style={[styles.text, { color: isDark ? "white" : "black" }]}>
                            {line}
                        </Text>
                    ))}
                </View>
                <Buttons shareFunction={onHaikuShare} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    innerContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        gap: 10,
        padding: 20,
    },
    text: {
        fontSize: 36,
        textAlign: "center",
        margin: "auto",
        marginHorizontal: "10%",
        fontWeight: "bold",
    },
});
