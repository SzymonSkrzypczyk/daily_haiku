import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function RootLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{title: "Index", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={"color"} size={24} />
          ),}} />
        <Tabs.Screen name="settings" options={{title: "Settings", headerShown: false, tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
          ),}} />
    </Tabs>
    );
}
