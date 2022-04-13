import React, {Component} from "react";
import { Text, View, Linking, Image } from 'react-native';
import {styles} from "./Home.styles";
import ButtonComponent from "../../components/Button";
import ImagePicker from 'react-native-image-picker'
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
//Abrir el menu de seleccionar foto o tomar foto
  async function openImagePicker(){
    const options = {
        title: 'Select Avatar',
        StorageOptions: {
            skipBackup:true,
            path: 'images'
        }
    }
    ImagePicker.showImagePicker(options,(response=>{
        if(response.didCancel){
            console.log('User canceled image picker');
        }else if(response.error){
            console.log('Error' + response.error);
        }else if(response.customBotton){
            console.log('User tapped customButton' + response.customBotton);
        }else{
            this.setState({
                imaPath: response.uri,
                imageHeight: response.height,
                imageWidth: response.width
            })
        }
    })
    )
  //----------------------------------
}

    return (
      <View style={styles.container}>
        {this.state.imaPath ? <Image source={{uri: this.state.imaPath}}/> : null}
      <Text style={{color: 'blue'}}
        onPress={() => Linking.openURL("https://github.com/AdanJaramillo/DMI-Actividad-I---Cat-logo-de-libros-AWS")}>
          GitHub
        </Text>
        <Text>Home Screen</Text>
        <ButtonComponent title="Logout" onPress={signOut} />
        {/* Mandamos a llamar la funcion para abrir imagenes */}
        <ButtonComponent title="camera" onPress={openImagePicker}></ButtonComponent>
      </View>
    )
  }