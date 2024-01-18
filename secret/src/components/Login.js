import React from "react"
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
export default function Login(){
    const [email,setEmail] =useState('');
   const [Password,setPassword] = useState('');
  const navigate = useNavigate();
    async function Submit(e){
        //console.log(email+" "+Password);
        e.preventDefault();
        setTitle('Loading')
        try{
           const token =  await axios.post('https://secret-app-backend.onrender.com/user/login',{user:email,password:Password});
           localStorage.setItem('secret-app',token.data);
           navigate('/App');
        }
        catch(err){
           alert(err.response.data);
           console.log(err);
           setTitle('Login'); 
        }
      }
      useEffect(()=>{
        try{
      const check = localStorage.getItem('secret-app');
      console.log(check);
      if(check){
        navigate('/App');
      }
     }
     catch(e){
        console.log(e);
     }
     },[]);
  const [Title,setTitle] = useState('Login');
    return(
        <section class="bg-black h-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
               Secret 
            </a>
            <div class="w-full bg-dark-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                       
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>{Submit(e)}}>{Title}</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have Account <Link to = "/signup" class="font-medium text-black hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    )
 
 }