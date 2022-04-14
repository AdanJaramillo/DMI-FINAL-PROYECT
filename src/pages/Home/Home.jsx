import React from "react";
import { Text, View, Linking, Platform } from 'react-native';
import {styles} from "./Home.styles";
import ButtonComponent from "../../components/Button";
import i18n from "../../../localization/i18n"
import {Amplify} from "aws-amplify"
import {Auth} from "aws-amplify";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function HomeScreen(){

  async function signOut(){
    try{
      await Amplify.Auth.signOut({gloobal:true});

    } catch(error)
    {
      console.log(error)
    }

  }

  async function getUserInfo(){
    Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  //---------- Eduardo Camara -------------
  const [image, setImage] = useState(null);

  useEffect(async()=>{
    if(Platform.OS !== "web"){
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted'){
        alert('Permission denied!')
      }
    }
  },[])

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

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false){
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled){
      setImage(result.uri);
      console.log(result.uri);
    }
  }
//---------------------------------------------------------
    return (
      <View style={styles.container}>
      <Text style={{color: 'blue'}}
        onPress={() => Linking.openURL("https://github.com/AdanJaramillo/DMI-FINAL-PROYECT")}>
          GitHub
        </Text>
{/* Eduardo Camara */}
      <ButtonComponent title="Pick an image from camera roll" onPress={pickImage}/>
      <ButtonComponent onPress={openCamera} title="Open Camera"/>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
{/* Eduardo Camara */}
      

        <Text>{i18n.t("Home Screen")}</Text>
        <ButtonComponent title={i18n.t("Logout")} onPress={signOut} />
        
      </View>
    )
  }