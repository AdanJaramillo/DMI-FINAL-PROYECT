import React from "react";
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
const [image, setImage] = useState(null);

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
  }
};
  //----------------------------------
    return (
      <View
       style={styles.container}>
        {this.state.imaPath ? <Image source={{uri: this.state.imaPath}}/> : null}
      <Text style={{color: 'blue'}}
        onPress={() => Linking.openURL("https://github.com/AdanJaramillo/DMI-Actividad-I---Cat-logo-de-libros-AWS")}>
          GitHub
        </Text>
        <Text>Home Screen</Text>
        <ButtonComponent title="Logout" onPress={signOut} />
        {/* Mandamos a llamar la funcion para abrir imagenes */}
        <ButtonComponent title="Subir foto." onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
  }