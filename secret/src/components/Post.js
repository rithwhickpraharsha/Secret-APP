import React from "react"
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
export default function Post(){
    const [category,setcategory] =useState('');
   const [secret,setsecret] = useState('');
   
   const navigate = useNavigate();
  async function Submit(e){
    e.preventDefault();
    try{
        await axios.post('https://secret-app-backend.onrender.com/secret/add',{token:localStorage.getItem('secret-app'),category:category.toLowerCase(),secret:secret});
        navigate("/App/Your-secret");   

    }catch(e){
         console.log(e);
         alert(e.response.data);
    }
    
   }
   useEffect(()=>{
      const check = localStorage.getItem("secret-app");
      if(!check){
        navigate("/");
      }
   },[]);
 
    return(
        <section class="bg-black">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
               Post Your Secret
            </a>
            <div class="w-full bg-dark-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                   
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" name="text" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="category of your secret" required="" onChange={(e)=>{setcategory(e.target.value)}}/>
                        </div>
                        <div>
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Secret</label>
                            <textarea type="text" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>{setsecret(e.target.value)}}/>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>{Submit(e)}}>POST    </button>
                      
                    </form>
                </div>
            </div>
        </div>
      </section>
    )
 
 }