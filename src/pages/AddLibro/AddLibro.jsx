import React, {useEffect, useState} from "react";
import { Text, View, TextInput } from "react-native";
import {styles} from "./AddLibro.styles";

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
        <Text>Agregar Libro</Text>

        <Text>Nombre</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, nombre: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       <Text>Descripcion</Text>
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
            <Text>Estatus</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, estatus: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />

<Text>ISBN</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, iSBN: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       <Text>Categoria</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, categoria: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       <Text>Fecha de publicación</Text>
        <TextInput
         onChangeText={(text)=>
          setTodo((current) =>({...current, fechapublicacion: text}))
      }
       style={{width:100, height:50, backgroundColor:"#e8eaed"}} 
       />
       
        <ButtonComponent title="Create todo" onPress={addData} />

      </View>
    );
  }