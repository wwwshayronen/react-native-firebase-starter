import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import { ENV } from "./envVars";

const firebaseConfig = ENV;

if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User is logged in</Text>
    </View>
  );
}
