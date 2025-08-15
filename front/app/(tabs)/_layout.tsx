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
            height: 70,
            borderTopWidth: 0,
            backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
            paddingBottom: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: -4,
            marginBottom: 4
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
            title: 'Novo Exercício',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.iconActive : styles.iconInactive}>
                <Ionicons 
                  name={focused ? "add-circle" : "add-circle-outline"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="addpch"
          options={{
            title: 'Novo Grupo',
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.iconActive : styles.iconInactive}>
                <Ionicons 
                  name={focused ? "add-outline" : "add"} 
                  size={24} 
                  color={color} 
                />
              </View>
            ),
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
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    padding: 8,
    borderRadius: 16,
    marginTop: 4, 
  },
  iconInactive: {
    padding: 8,
    borderRadius: 16,
    marginTop: 4, 
  },
});