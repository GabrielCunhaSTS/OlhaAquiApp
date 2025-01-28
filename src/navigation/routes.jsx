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

import HeaderLogo from "../components/header";

const Stack = createStackNavigator();

const routes = [
  { name: "HomePage", component: HomePage },
  { name: "CondominioPage", component: CondominioPage },
  { name: "NewsPage", component: NewsPage },
  { name: "JurisprudencePage", component: JurisprudencePage },
  { name: "ContactPage", component: ContactPage },
  { name: "EventsPage", component: EventsPage },
  { name: "ChooseSide", component: ChooseSide },
  { name: "CondominoPage", component: CondominoPage },
  { name: "AddNew", component: AddNew },
  { name: "AddEvent", component: AddEvent },
];

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        {routes.map(({ name, component }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              headerTitle: () => <HeaderLogo />,
              headerTitleAlign: "center",
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
