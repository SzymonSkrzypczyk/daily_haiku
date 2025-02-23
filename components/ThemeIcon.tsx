import { useState } from 'react';
import { Image } from 'expo-image';
import { View, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

interface ThemeIconProps {
    image: any;
    activeTheme: number;
    themeKey: number;
    setActiveTheme: (theme: number) => void;

}

export default function ThemeIcon({ image, activeTheme, setActiveTheme, themeKey }: ThemeIconProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    

    return (
        <View>
            <Pressable onPress={() => setActiveTheme(themeKey)}>
                <Image
                    source={image} // Use the passed 'require' image
                    style={[styles.icon, { borderColor: activeTheme == themeKey ? "gold" : "blue" }]}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        borderRadius: 75,
        resizeMode: "cover",
        overflow: "hidden",
        borderWidth: 1,
        marginHorizontal: 2
    },
});
