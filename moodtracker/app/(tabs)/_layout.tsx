import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#2b26c8ff",
            tabBarLabelStyle: {
                fontSize: 12,
                lineHeight: 10,
                includeFontPadding: true,
                marginBottom: 0,
            },
            tabBarStyle: {
      height: 64,          // a bit taller than default
      paddingBottom: 8,    // space above the home indicator
      paddingTop: 6,
    },
    headerTitleAlign: "center",
        }}
    >
      <Tabs.Screen name="index" 
      options={{
        headerTitle: "Mood Tracker",
        headerTitleAlign: "center",
        tabBarIcon: ({focused, color}) => 
        (<Ionicons name={focused ? "home-sharp" : "home-outline"} 
        color={color}
        size={30} /> ),
      }}/>
      <Tabs.Screen name="history" 
        options={{
            headerTitle: "Mood History",
            headerTitleAlign: "center",
            tabBarIcon: ({focused, color}) => 
            (<Ionicons name={focused ? "book-sharp" : "book-outline"} 
            color={color}
            size={30} />
            ),
        }}/>
      <Tabs.Screen name="journal" 
        options={{
            headerTitle: "Mood History",
            headerTitleAlign: "center",
            tabBarIcon: ({focused, color}) => 
            (<Ionicons name={focused ? "create-sharp" : "book-outline"} 
            color={color}
            size={30} />
            ),    
        }}/>
      <Tabs.Screen name="profile" 
        options={{
            headerTitle: "Mood History",
            headerTitleAlign: "center",
            tabBarIcon: ({focused, color}) =>
            (<Ionicons name={focused ? "man-sharp" : "man-outline"}
            size={30} />
            ),
        }}/>
    </Tabs>
  );
}
