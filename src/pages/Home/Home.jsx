import React from "react";
import { Text, View, Linking } from 'react-native';
import {styles} from "./Home.styles";
import ButtonComponent from "../../components/Button";
import i18n from "../../../localization/i18n"
import {Amplify} from "aws-amplify"

export default function HomeScreen(){

  async function signOut(){
    try{
      await Amplify.Auth.signOut({gloobal:true});

    } catch(error)
    {
      console.log(error)
    }

  }

    return (
      <View style={styles.container}>
      <Text style={{color: 'blue'}}
        onPress={() => Linking.openURL("https://github.com/AdanJaramillo/DMI-FINAL-PROYECT")}>
          GitHub
        </Text>

      
        <Text>{i18n.t("Home Screen")}</Text>
        <ButtonComponent title={i18n.t("Logout")} onPress={signOut} />
      </View>
    )
  }