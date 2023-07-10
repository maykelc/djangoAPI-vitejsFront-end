import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import {TaskCard} from './TaskCard'

export function TasksList(){

    const [tasks, setTasks]= useState([]);

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks();
            setTasks(res.data);
        }
        loadTasks();
    }, []);

    return  <div className="grid grind-cols-3 gap-3">
        {tasks.map(task => (
            <div key={task.id}>
                <TaskCard key={task.id} task={task} />
            </div>
        ))}
        </div>
    
}