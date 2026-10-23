import { useState } from 'react';

// Day 120
// Components and Props in TypeScript
// Team Task Board

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    priority: 'Low' | 'Medium' | 'High';
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

function Day120() {
    const [inputText, setInputText] = useState<string>('');
    const [selectedPriority, setSelectedPriority] = useState<Task['priority']>('Low');
    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title: inputText,
            isCompleted: false,
            priority: selectedPriority
        };
        setTasks([...tasks, newTask]);
        setInputText('');
        setSelectedPriority('Low')
    }

    const handleToggle = (id: number) => {
        setTasks(
            tasks.map((task) => 
                task.id === id ? {...task, isCompleted: !task.isCompleted} :
                task
            )
        );
    }

    const handleDelete = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

  return (
    <div>
        <h2>Task Board 📋</h2>
        <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Enter new task...'
            maxLength={50}
        />
        <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value as Task['priority'])}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button onClick={() => createTask()}>Add Task ➕</button>

        {tasks.map(task => (
            <TaskItem 
                key={task.id}
                task={task}
                onToggle={handleToggle} 
                onDelete={handleDelete}
            />
        ))}
    </div>
  );
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.priority}</p>
            <p>{task.isCompleted === true ? 'Completed' : 'In progress'}</p>
            <button onClick={() => onToggle(task.id)}>Change status</button>
            <button onClick={() => onDelete(task.id)}>Delete task</button>
        </div>
    );
}

export default Day120;