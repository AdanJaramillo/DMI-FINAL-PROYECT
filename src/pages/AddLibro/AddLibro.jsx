import React, {useEffect, useState} from "react";
import { Text, View, TextInput } from "react-native";
import {styles} from "./AddLibro.styles";
import i18n from "../../../localization/i18n"
import { list, create, onCreate } from "../../services/todos";
import ButtonComponent from "../../components/Button";


export default function AddLibroScreen(){
  const [todos, setTodos] = useState();

  const [todo, setTodo] = useState({nombre:"", descripcion:"", estatus:"", iSBN:"", categoria:"", fechapublicacion:""})
async function listTodos(){
  const todosFetched = await list();
  if(todosFetched) setTodos(todosFetched);
} 
async function createTodo(nombre, descripcion, estatus, iSBN, categoria, fechapublicacion){
  const todoCreated = await create({nombre, descripcion, estatus, iSBN, categoria, fechapublicacion});
  return todoCreated;
}
const addData = () => {
  createTodo(todo.nombre, todo.descripcion, todo.estatus, todo.iSBN, todo.categoria, todo.fechapublicacion);
};

useEffect(() =>{
  listTodos();
  let subscription;
  (async function subscribe(){
    subscription = await onCreate(listTodos);

    })();
    return () => {
      subscription?.unsubscribe();
    };
}, []);

return (
      <View style={styles.container}>
        <Text>{i18n.t("Agregar Libro")}</Text>

        <Text>{i18n.t("Nombre")}</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, nombre: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       <Text>{i18n.t("Descripcion")}</Text>
        <TextInput 
        onChangeText={(text)=>
          setTodo((current) =>({...current, descripcion: text}))
      }
         style={{
           width:100, 
           height:50, 
           backgroundColor:"#e8eaed",
           paddingHorizontal:10, 
           marginVertical:10,
          }} 
           />
            <Text>{i18n.t("Estatus")}</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, estatus: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />

<Text>{i18n.t("ISBN")}</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, iSBN: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       <Text>{i18n.t("Categoria")}</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, categoria: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       <Text>{i18n.t("Fecha de publicación")}</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, fechapublicacion: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       
        <ButtonComponent title={i18n.t("Create todo")} onPress={addData} />

      </View>
    );
  }