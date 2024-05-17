import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

const ToDoList = () => {

    const [isCompleteScreen, setIsCompleteScreen] = useState(0);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        };

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        console.log(updatedTodoArr);

        // localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1); // Fix to remove only one item at the specified index
        setTodos(reducedTodo);
        console.log(reducedTodo);
    };

    const handleCompleteTodo = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

        let filteredItem = {
            ...allTodos[index],
            completedOn
        };

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
    };

    const handleCompletedDeleteTodo = (index) => {
        let reducedTodo = [...completedTodos];
        reducedTodo.splice(index, 1); // Fix to remove only one item at the specified index
        setCompletedTodos(reducedTodo);
    };

    // useEffect(() => {
    //     let savedTodo = localStorage.getItem('todolist');
    //     JSON.parse(savedTodo);
    //     if (savedTodo) {
    //         setTodos(savedTodo);
    //     }
    // }, []);

    return (
        <div>
            <h1>To Do List</h1>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title: </label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Enter Your Title' />
                    </div>

                    <div className="todo-input-item">
                        <label>Enter Task Description: </label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Enter Your Task Description' />
                    </div>

                    <div className="todo-input-item">
                        <button className='primaryBtn' onClick={handleAddTodo}>Add The Task</button>
                    </div>
                </div>

                <div className="btn-area">
                    <button className={`secondaryBtn ${isCompleteScreen === 0 && 'active'}`} onClick={() => setIsCompleteScreen(0)}>To Do</button>
                    <button className={`secondaryBtn ${isCompleteScreen === 2 && 'active'}`} onClick={() => setIsCompleteScreen(2)}>Completed</button>
                    <button className={`secondaryBtn ${isCompleteScreen === 3 && 'active'}`} onClick={() => setIsCompleteScreen(3)}>All</button>
                </div>

                <div className="todo-list">
                    {isCompleteScreen === 0 && allTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <div className="icons">
                                    <AiOutlineDelete className='icon-del' onClick={() => handleDeleteTodo(index)} />
                                    <BsCheckLg className='icon-check' onClick={() => handleCompleteTodo(index)} />
                                </div>
                            </div>
                        );
                    })}

                    {isCompleteScreen === 2 && completedTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p><small>Completed On: {item.completedOn}</small></p>
                                <div className="icons">
                                    <AiOutlineDelete className='icon-del' onClick={() => handleCompletedDeleteTodo(index)} />
                                </div>
                            </div>
                        );
                    })}

                    {isCompleteScreen === 3 && (
                        <>
                            <h2>To Do</h2>
                            {allTodos.map((item, index) => (
                                <div className='todo-list-item' key={`todo-${index}`}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <div className="icons">
                                        <AiOutlineDelete className='icon-del' onClick={() => handleDeleteTodo(index)} />
                                        <BsCheckLg className='icon-check' onClick={() => handleCompleteTodo(index)} />
                                    </div>
                                </div>
                            ))}
                            <h2>Completed</h2>
                            {completedTodos.map((item, index) => (
                                <div className='todo-list-item' key={`completed-${index}`}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed On: {item.completedOn}</small></p>
                                    <div className="icons">
                                        <AiOutlineDelete className='icon-del' onClick={() => handleCompletedDeleteTodo(index)} />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
