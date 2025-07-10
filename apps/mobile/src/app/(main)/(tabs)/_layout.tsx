import { Icon } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { Tabs } from "expo-router"

export default function TabsLayout() {
  const { theme } = useAppTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: theme.colors.palette.primary600,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              icon={focused ? "home-selected" : "home"}
              color={focused ? color : theme.colors.palette.neutral500}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              icon={focused ? "explore-selected" : "explore"}
              color={focused ? color : theme.colors.palette.neutral500}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Liked",
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              icon={focused ? "favorite-selected" : "favorite"}
              color={focused ? color : theme.colors.palette.neutral500}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Ticket",
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              icon={focused ? "ticket-selected" : "ticket"}
              color={focused ? color : theme.colors.palette.neutral500}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, focused, color }) => (
            <Icon
              icon={focused ? "profile-selected" : "profile"}
              color={focused ? color : theme.colors.palette.neutral500}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
