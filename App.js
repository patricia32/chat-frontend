//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import ChatScreen from './screens/ChatScreen';
import Chats from './screens/Chats'

import { colors } from './utils/styles';

const Stack = createNativeStackNavigator();


export default function App() {

  const currentUserId = 'user1';

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen 
                name="Chats" 
                component={Chats}
                initialParams={{ currentUserId }}
                options={{
                  headerStyle:{
                    backgroundColor: colors.purple500,
                  },
                  headerTitleStyle:{
                    fontWeight:'bold',
                  },
                  headerTintColor: colors.purple100,
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
                    backgroundColor: colors.purple500,
                  },
                  headerTitleStyle:{
                    fontWeight: 700,
                  },
                  headerTintColor: colors.purple100,
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
