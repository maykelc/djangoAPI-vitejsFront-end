import { useEffect } from 'react'; 
import { useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams} from 'react-router-dom';
import { toast } from 'react-hot-toast';


export function TaskFormPage(){
    
    const { register, handleSubmit, formState:{errors},setValue } = useForm();
    const navigate = useNavigate()
    const params = useParams()


    const onSubmit = handleSubmit(async(data) => {
        if(params.id){
            await updateTask(params.id, data)
            toast.success('Tarea Actualizada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            });
        }else{
            await createTask(data);
            toast.success('Tarea Creada', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            });
            }
        navigate("/tasks");
    });

    useEffect(()=>{
        async function loadTask(){
            if(params.id){
                const res = await getTask(params.id);
                console.log(res);
                setValue('titulo', res.data.titulo)
                setValue('descripcion', res.data.descripcion)
            }    
        }
        loadTask();
    }, [])


    return(
        <div className="max-w-xl mx-auto ">
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="titulo" 
                {...register("titulo", {required: true})}
                className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.titulo && <span> Este campo es requerido</span>}

                <textarea rows="3" placeholder="descripcion"
                {...register("descripcion", {required: true})}
                className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.descripcion && <span> Este campo es requerido</span>}

                <button
                className='bg-indigo-500 p-3 rounded-lg block w-full mt-3 '
                >Guardar</button>
                
            </form>
            {params.id && (
                <div className="flex justify-end">
                    <button 
                        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                        onClick={async() =>{
                        const accepted = window.confirm('Estas Seguro');
                        if (accepted){
                            await deleteTask(params.id);
                            toast.success('Tarea Eliminada', {
                                position: "bottom-right",
                                style: {
                                    background: "#101010",
                                    color: "#fff"
                                }
                            });
                            navigate("/tasks")
                        }
                    }}>Eliminar</button>
                </div>
                ) }
        </div>
    );
}