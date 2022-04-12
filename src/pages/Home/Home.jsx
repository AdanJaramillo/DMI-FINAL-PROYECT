import React from "react";
import { Text, View, Linking } from 'react-native';
import {styles} from "./Home.styles";
import ButtonComponent from "../../components/Button";

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
        onPress={() => Linking.openURL("https://github.com/AdanJaramillo/DMI-Actividad-I---Cat-logo-de-libros-AWS")}>
          GitHub
        </Text>

      
        <Text>Home Screen</Text>
        <ButtonComponent title="Logout" onPress={signOut} />
      </View>
    )
  }