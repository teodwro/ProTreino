import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: isDark ? '#94a3b8' : '#64748b',
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            height: 64,
            borderTopWidth: 0,
            backgroundColor: isDark ? '#0b1220' : '#ffffff',
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 12,
            paddingBottom: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: -2,
            marginBottom: 6,
          },
        }}>
        <Tabs.Screen
          name="exercicio"
          options={{
            title: 'Exercícios',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.iconActive : styles.iconInactive}>
                <Ionicons 
                  name={focused ? "barbell" : "barbell-outline"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="treinos"
          options={{
            title: 'Treinos',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.iconActive : styles.iconInactive}>
                <Ionicons 
                  name={focused ? "fitness" : "fitness-outline"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="addexercicio"
          options={{
            href: null,
            title: 'Novo Exercício',
          }}
        />
        <Tabs.Screen
          name="addpch"
          options={{
            href: null,
            title: 'Novo Grupo',
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.iconActive : styles.iconInactive}>
                <Ionicons 
                  name={focused ? "person" : "person-outline"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  iconActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    padding: 8,
    borderRadius: 12,
    marginTop: 4,
  },
  iconInactive: {
    padding: 8,
    borderRadius: 12,
    marginTop: 4,
  },
});