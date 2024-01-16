
import {React,useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function View(){
  const navigate  = useNavigate();

    const [conf,setConf] = useState([]);
    function Checkout(e){
      localStorage.removeItem('secret-app');
      navigate('/');
    }
    

    useEffect(()=>{
     async function call(){
      const get_categories =  await axios.get('https://secret-app-gamma.vercel.app/secret/categories');
      
      setConf(get_categories.data);
     }
     const check = localStorage.getItem('secret-app');
     if(check){
     call();
     }
     else{
      navigate("/");
     }
    },[conf]);
    //conf=[{id:"1",category:"theft"},{id:"2",category:"thefts"},{id:"2",category:"thefts"},{id:"2",category:"thefts"},{id:"2",category:"thefts"},{id:"2",category:"thefts"},{id:"2",category:"thefts"},{id:"3",category:"theftd"},{id:"4",category:"thefties"}];

    return(
        <div >
    <div className='h-[10vh] bg-gray-dark flex text-black align-middle justify-around mx-auto'>
        <button className='h-5 md:h-7 lg:h-10  hover:bg-green bg-white px-2 m-auto ' onClick={()=>{navigate("/App/post")}}>Post</button>
        <button className='h-5 md:h-7 lg:h-10 hover:bg-green bg-white px-2 m-auto' onClick={()=>{navigate("/App/Your-secret")}}>Your Secret </button>
        <button className='h-5 md:h-7 lg:h-10 hover:bg-red bg-white px-2 m-auto' onClick={(e) =>{Checkout(e)}}>Logout</button>
      
    </div>
    <div className='flex flex-col bg-black h-[90vh] overflow-auto '>
  <h1 className='text-3xl md:text-4xl lg:text-5xl text-white flex justify-center'>
    Categories
  </h1>
  <div>
    {
      conf.map((x,i)=>{
        return <button className='bg-black h-10 hover:bg-purple  border border-blue text-white bord w-full my-5' onClick={(e)=>{navigate(`/App/Category/${x}`)}}>{x}</button>
      })
    } 
  </div>
  
  

  </div>
    </div>

    )








}