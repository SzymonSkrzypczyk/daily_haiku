import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SharedStateProvider, useSharedState } from "@/context/SharedStateContext";

export default function RootLayout() {
  return (
    <SharedStateProvider>
      <Root />
    </SharedStateProvider>
  );
}

function Root() {
  const { isDark } = useSharedState(); 

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Index",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                color={color}
                size={24}
              />
            ),
            tabBarStyle: { backgroundColor: isDark ? '#121212' : '#fff' },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'settings-sharp' : 'settings-outline'}
                color={color}
                size={24}
              />
            ),
            tabBarStyle: { backgroundColor: isDark ? '#121212' : '#fff' },
          }}
        />
      </Tabs>
    </>
  );
}
