import {API, graphqlOperation} from "aws-amplify";
import {getTodo, listTodos} from "../graphql/queries";
import {createTodo, updateTodo, deleteTodo} from "../graphql/mutations";
import {OnCreateTodo} from "../graphql/subscriptions";

const list = async () => {
    try{
        const todos = await API.graphql(graphqlOperation(listTodos));
        return todos.data.listTodos.items;
    }catch(error){
        console.log({error});
    }
};

const create = async(todo) => {
    try{
        const newTodo = await API.graphql(
            graphqlOperation(createTodo, {input:todo})
    );
    return newTodo;
    }catch (error){
console.log({error});
    }
    
};

const onCreate = async(subscriptionFunction) => {
    const subscription = API.graphql(graphqlOperation(OnCreateTodo)).subscribe({
        next:(todoData)=>{
            console.log({todoData});
            subscriptionFunction();

        },
    });
    return subscription;
};

export {list, create, onCreate};