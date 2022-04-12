import React from "react";
import {StatusBar} from "expo-status-bar";
import { Text, View } from 'react-native';
import i18n from "../../../localization/i18n"
import {styles} from "./Login.styles";
import ButtonComponent from "../../components/Button";

export default function Login({onPress}){
return (
    <View style={styles.container}>
      <StatusBar/>
      <Text>Login Screen</Text>
      <ButtonComponent title={i18n.t("Login")} onPress={onPress} />
    </View>
  );
}