import React, {useEffect, useState} from "react";
import { Text, View } from "react-native";
import {styles} from "./Lista.styles";

import { list, create, onCreate } from "../../services/todos";



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
  
      <View style={styles.container}>
        


        {todos && 
          todos.map((todo)=> (
          <Text key={todo.id}> {`${todo.nombre} ${todo.descripcion} ${todo.estatus} ${todo.iSBN} ${todo.categoria} ${todo.fechapublicacion}`}</Text>
          ))}

      </View>
    );
  }