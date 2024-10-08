import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";

export default function TodoForm(){
    const bgColors = ["#cc474b", "#8ebb47", "#2c8fdb", "#a92fb9", "#c3c835"]
    const {addTodo} = useTodo()
    const [todo, setTodo] = useState("")
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const [bgcolor, setBgcolor] = useState("#cc474b")

    const add = (e) => {
        e.preventDefault()

        if(!todo) return

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        addTodo({
            todo : todo,
            completed: false,
            file : file,
            bgcolor : bgcolor,
            date : formattedDate
        })

        setFile(null)
        setTodo("")
        setPreview(null)
        setBgcolor("#cc474b")
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        setFile(selectedFile)
        
        if (selectedFile) {
            const filePreview = URL.createObjectURL(selectedFile);
            setPreview(filePreview);
        }

    };


        return (
            <form  className={`flex bg-[${bgcolor}] relative flex-col rounded border-solid border-2 p-4 gap-3`}>
                <input
    
                    type="text"
                    placeholder="Write Todo..."
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                    className="w-full min-h-2 text-black border border-black/10 rounded-l-lg px-3 outline-none duration-150  py-1.5"
                />

                {preview && (
                        <div className="mt-3">
                        <img 
                        src={preview}  
                        className="w-64 h-auto rounded-md mx-auto"
                        />
                    </div>
                )}

                <div className="flex gap-2 items-center justify-center align-middle">
                    Choose Background Color:
                   
                    <button className={`w-7 h-7 bg-[#cc474b]   ${bgcolor ==="#cc474b" ? "border-white border-solid border-4": ""}`}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                setBgcolor("#cc474b")
                            }
                        }
                    ></button>

<button className={`w-7 h-7 bg-[#8ebb47]   ${bgcolor ==="#8ebb47" ? "border-white border-solid border-4": ""}`}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                setBgcolor("#8ebb47")
                            }
                        }
                    ></button>

                    <button className={`w-7 h-7 bg-[#2c8fdb]   ${bgcolor ==="#2c8fdb" ? "border-white border-solid border-4": ""}`}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                setBgcolor("#2c8fdb")
                            }
                        }
                    ></button>

                    <button className={`w-7 h-7 bg-[#a92fb9]   ${bgcolor ==="#a92fb9" ? "border-white border-solid border-4": ""}`}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                setBgcolor("#a92fb9")
                            }
                        }
                    ></button>


                    <button className={`w-7 h-7 bg-[#c3c835]   ${bgcolor ==="#c3c835" ? "border-white border-solid border-4": ""}`}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                setBgcolor("#c3c835")
                            }
                        }
                    ></button>





                </div>

                <div className="flex gap-5">
                    <label className="bg-[#fa8466] rounded-full w-44  flex items-center justify-center cursor-pointer"> Upload Image
                        <input 
                            accept="image/*"
                            className="hidden"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </label>

                    <button className="bg-[#fa8466] rounded-full w-44"
                        onClick={
                            (e) => {
                                e.preventDefault()
                                setFile(null)
                                setTodo("")
                                setPreview(null)
                                setBgcolor("#cc474b")
                            }
                        }
                    >
                        Reset
                    </button>
                    
                    <button type="submit"
                    onClick={add}
                    className="rounded-full flex-1 px-3 py-1 bg-green-600 text-white shrink-0">
                        Add
                    </button>



                    
                </div>
            </form>
        );

}