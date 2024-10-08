import React, { useEffect, useState } from "react";
import { useTodo } from "../Context/TodoContext";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo()
    const [preview, setPreview] = useState("")
    const [file, setFile] = useState("")

    const editTodo = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        updateTodo(todo.id, {...todo, todo : todoMsg, date : formattedDate})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    useEffect(() => {
        console.log(todo.file)
        if (todo.file) {
            const filePreview = URL.createObjectURL(todo.file);
            setPreview(filePreview);


            return () => console.log(todo.file)
        }
    }, [todo.file]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        setFile(selectedFile)
        
        if (selectedFile) {
            const filePreview = URL.createObjectURL(selectedFile);
            setPreview(filePreview);
        }

    };


    return (
        <div
            className={`h-full flex border items-center border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50  duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : `bg-[${todo.bgcolor}]`
            }`}
        >
            

            <div className="relative flex-1 flex flex-col h-full justify-center">
                <div className="flex flex-row"> 
                    <input
                        type="checkbox"
                        className="cursor-pointer md:mt-1 mr-1 self-start form-checkbox w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={todo.completed}
                        onChange={toggleCompleted}
                    />

                    <textarea 
                        type="text"
                        className={`md:text-base text-[12px] self-start border w-full resize-none overflow-hidden outline-none  bg-transparent rounded-lg ${
                            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                        } ${todo.completed ? "line-through" : ""}`}
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        readOnly={!isTodoEditable}
                    />

                </div>
                
                <div className="absolute bottom-0 md:text-base text-[10px]">Edited on: {todo.date}</div>
            </div>

             {preview && (
                <div className="mt-3">
                <img 
                src={preview}  
                className="w-24 max-h-16 md:w-64 md:max-h-48 rounded-md mx-auto"
                />
            </div>
            )}

            
            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    onClick={() => {
                        if (todo.completed) return;

                        if (isTodoEditable) {
                            editTodo();
                        } else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "📁" : "✏️"}
                </button>

                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                    onClick={() => deleteTodo(todo.id)}
                >
                    ❌
                </button>
                </div>

                <label
                    className=" mx-auto inline-flex w-10 text-xl h-8 rounded-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 "
                >
                    🖼️
                    <input 
                            accept="image/*"
                            className="hidden"
                            type="file"
                            onChange={handleFileChange}
                        />
                </label>

                </div>

           
        </div>
        
    );
}

export default TodoItem;