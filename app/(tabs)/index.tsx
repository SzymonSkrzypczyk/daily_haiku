import { useState, useRef, useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import Buttons from "@/components/Buttons";
import * as Sharing from 'expo-sharing';
import { useSharedState } from '@/context/SharedStateContext';
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase';

const themeImages: { [key: string]: any } = {
    "1": require("@/assets/images/themes/theme1.jpg"),
    "2": require("@/assets/images/themes/theme2.jpg"),
    "3": require("@/assets/images/themes/theme3.jpg"),
    "4": require("@/assets/images/themes/theme4.jpg"),
    "5": require("@/assets/images/themes/theme5.jpg"),
};

const app = initializeApp(firebaseConfig); // Initialize Firebase
const db = getFirestore(app); // Get Firestore instance

export default function Index() {
    const { isDark, activeTheme } = useSharedState(); 
    const haikuRef = useRef<ImageBackground>(null);
    
    const [haikuImage, setHaikuImage] = useState(themeImages["1"]); 
    const [loading, setLoading] = useState(true); // Track loading state
    const [haiku, setHaiku] = useState<string[]>([]); // State to store Haiku

    useEffect(() => {
        setLoading(true); // Start loading when theme changes
        setHaikuImage(themeImages[activeTheme] || themeImages["1"]);
        fetchRandomHaiku(); // Fetch random Haiku on component mount
    }, [activeTheme]);

    const fetchRandomHaiku = async () => {
        try {
            const haikuCollectionRef = collection(db, "haiku");

            const randomQuery = query(haikuCollectionRef, orderBy('0'), limit(1)); 

            const snapshot = await getDocs(randomQuery); 
            const haikus = snapshot.docs.map(doc => doc.data());
            const haiku = haikus[0];

            if (haikus.length > 0) {
                // Set the state with the random Haiku
                setHaiku([
                    haiku["0"],
                    haiku["1"],
                    haiku["2"],
                ]);
            }

            setLoading(false); // Stop loading
        } catch (error) {
            console.error("Error retrieving Haiku:", error);
            setLoading(false); // Stop loading on error
        }
    };

    // On image load complete, stop loading
    const handleImageLoad = () => {
        setLoading(false);
    };

    const onHaikuShare = async () => {
        try {
            const localUri = await captureRef(haikuRef, {
                height: 440,
                quality: 1,
            });

            if (!localUri) {
                alert('Error while sharing your Haiku!');
                return;
            }

            await Sharing.shareAsync(localUri);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
            <View style={styles.innerContainer}>
                {/* Show loading spinner until Haiku is loaded */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <ImageBackground 
                        source={haikuImage} 
                        style={styles.haikuBackground} 
                        imageStyle={styles.imageStyle}
                        ref={haikuRef}
                        onLoad={handleImageLoad} // Handle image load
                    >
                        <View collapsable={false} style={styles.haikuContainer}>
                            {haiku.map((line, index) => (
                                <Text key={index} style={[styles.text, { color: "white" }]}>
                                    {line}
                                </Text>
                            ))}
                        </View>
                    </ImageBackground>
                )}

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
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        gap: 10,
        padding: 20,
    },
    haikuBackground: {
        width: "100%", 
        height: 300,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
    },
    imageStyle: {
        resizeMode: "cover",
        borderRadius: 10,
    },
    haikuContainer: {
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "800",
    },
});
