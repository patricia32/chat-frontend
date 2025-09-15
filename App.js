//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chats from './screens/Chats'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from './utils/styles';
import ChatScreen from './screens/ChatScreen';

    const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen 
                name="Chats" 
                component={Chats}
                options={{
                  headerStyle:{
                    backgroundColor: colors.gray700,
                  },
                  headerTitleStyle:{
                    fontWeight:'bold',
                  },
                  headerTintColor: colors.purple500,
                  contentStyle:{
                    backgroundColor: colors.gray100
                  }
                }}  
              />

              <Stack.Screen 
                name="ChatScreen" 
                component={ChatScreen}
                options={{
                  headerStyle:{
                    backgroundColor: colors.gray700,
                  },
                  headerTitleStyle:{
                    fontWeight:'bold',
                  },
                  headerTintColor: colors.purple500,
                  contentStyle:{
                    backgroundColor: colors.gray100
                  }
                }}  
              />

          </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
