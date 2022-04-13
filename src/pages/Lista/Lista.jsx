import React, {useEffect, useState} from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import {styles} from "./Lista.styles";
import { list, create, onCreate } from "../../services/todos";
import { Card, ListItem, Button } from 'react-native-elements'
import i18n from "../../../localization/i18n"



export default function ListaScreen(){
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

  <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
  
      <Card>
  <Card.Title>{i18n.t("Libros")}</Card.Title>
  <Card.Divider/>
        
   {todos && 
          todos.map((todo)=> (
            
          <Text key={todo.id}>  {`${todo.nombre} ${todo.descripcion} ${todo.estatus} ${todo.iSBN} ${todo.categoria} ${todo.fechapublicacion}`}</Text>
          ))}

</Card>
      </ScrollView>
      </SafeAreaView>
    );
  }