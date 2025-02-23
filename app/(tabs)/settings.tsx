import { useState } from "react";
import { View, Text, Switch, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSharedState } from '@/context/SharedStateContext';

interface Theme {
    key: number;
    image: any;
}

export default function Settings() {
    const themes: Theme[] = [
        { key: 1, image: require("@/assets/images/themes/theme1.jpg") },
        { key: 2, image: require("@/assets/images/themes/theme2.jpg") },
        { key: 3, image: require("@/assets/images/themes/theme3.jpg") },
        { key: 4, image: require("@/assets/images/themes/theme4.jpg") },
        { key: 5, image: require("@/assets/images/themes/theme5.jpg") }
    ];

    // Use shared state to get and set the active theme
    const { activeTheme, setActiveTheme, isDark, toggleDarkTheme } = useSharedState();

    const renderThemeItem = ({ item }: { item: Theme }) => (
        <TouchableOpacity onPress={() => setActiveTheme(item.key)} style={styles.themeItem}>
            <Image source={item.image} style={[styles.themeImage, activeTheme === item.key && styles.selectedTheme]} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
            <View style={styles.row}>
                <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>Dark Mode</Text>
                <Switch value={isDark} onValueChange={toggleDarkTheme} />
            </View>
            <View style={styles.row_themes}>
                <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>Select Theme</Text>
                <FlatList
                    data={themes}
                    renderItem={renderThemeItem}
                    horizontal
                    keyExtractor={(item) => item.key.toString()}
                    contentContainerStyle={styles.themeList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "20%",
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    row_themes: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
    },
    themeList: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    themeItem: {
        borderRadius: 10,
        overflow: "hidden",
    },
    themeImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        opacity: 0.8,
    },
    selectedTheme: {
        borderWidth: 3,
        borderColor: "#4CAF50",
        opacity: 1,
    },
});
