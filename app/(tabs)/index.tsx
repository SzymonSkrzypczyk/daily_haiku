import { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot'
import { View, Text } from "react-native";
import Buttons from "@/components/Buttons";
import { StyleSheet } from "react-native";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export default function Index(){
    const haikuRef = useRef<View>(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [haiku, setHaiku] = useState<string[]>(["A world of dew", "And within every dewdrop", "A world of struggle."]);

    const onHaikuShare = async () => {
        if (status == null) {
            requestPermission();
        }
        try {
          const localUri = await captureRef(haikuRef, {
            height: 440,
            quality: 1,
          });
    
          await Sharing.shareAsync(localUri);
          if (!localUri) {
            alert('error while sharing your Haiku!');
          }
        } catch (e) {
          console.log(e);
        }
      };

    return (
        <View
        style={styles.container}>
            <View style={styles.innerContainer} >
                <View ref={haikuRef} collapsable={false}>
                    <Text style={styles.text}>{haiku[0]}</Text>
                    <Text style={styles.text}>{haiku[1]}</Text>
                    <Text style={styles.text}>{haiku[2]}</Text>
                </View>
                <Buttons shareFunction={onHaikuShare}/>
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
        backgroundColor: "lightgrey",
    },
    innerContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        gap: 10,
    },
    text: {
        fontSize: 36,
        textAlign: "center",
        margin: "auto",
        marginHorizontal: "10%"
    }
});
