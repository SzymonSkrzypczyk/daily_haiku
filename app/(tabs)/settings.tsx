import { useState } from "react";
import { View, Text, Switch, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import ThemeIcon from "@/components/ThemeIcon";


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

    const [activeTheme, setActiveTheme] = useState<number>(1);

    const [isDark, setIsDark] = useState<boolean>(false);
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "white" }]}>
            <View style={styles.row}>
                <Text style={{ color: isDark ? "white" : "black" }}>Dark Mode</Text>
                <Switch value={isDark} onValueChange={toggleTheme} />
            </View>
            <View style={styles.row_themes}>
                <Text style={{ color: isDark ? "white" : "black", "marginRight": "30%" }}>Theme</Text>
                <FlatList data={themes} renderItem={({ item }) => <ThemeIcon image={item.image} activeTheme={activeTheme} setActiveTheme={setActiveTheme} themeKey={item.key}/>} horizontal/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "20%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    row_themes: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    }
});
