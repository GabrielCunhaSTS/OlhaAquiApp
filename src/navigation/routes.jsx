import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, StyleSheet } from "react-native";

import HomePage from "../screens/home";
import CondominioPage from "../screens/condominio";
import NewsPage from "../screens/news";
import JurisprudencePage from "../screens/jurisprudence";
import ContactPage from "../screens/contact";
import EventsPage from "../screens/events";
import ChooseSide from "../screens/choseside";
import CondominoPage from "../screens/condominio";
import AddNew from "../screens/createnews";
import AddEvent from "../screens/createevents";

const Stack = createStackNavigator();

const HeaderLogo = () => (
  <View style={styles.headerContainer}>
    <Image 
      source={require("../img/logo.png")} 
      style={styles.logo}  
    />
  </View>
);

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="CondominioPage" 
          component={CondominioPage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="NewsPage" 
          component={NewsPage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="JurisprudencePage" 
          component={JurisprudencePage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="ContactPage" 
          component={ContactPage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="EventsPage" 
          component={EventsPage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="ChooseSide" 
          component={ChooseSide} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="CondominoPage" 
          component={CondominoPage} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
        />
        <Stack.Screen 
          name="AddNew" 
          component={AddNew} 
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: "center",
          }} 
       
          />
          <Stack.Screen 
            name="AddEvent" 
            component={AddEvent} 
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    headerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 150,
      height: 50,
    },
  });
  