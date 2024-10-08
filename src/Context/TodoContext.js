import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo Message",
            completed : "False",
            bgcolor : "#cc474b",
            date : "",
            file : {},
        },
    ],
    addTodo : (todo) => {},
    updateTodo : (id, newTodo) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {}

})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoContextProvider = TodoContext.Provider