import React from "react"
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
export default function Signup(){
    const [email,setEmail] =useState('');
   const [Password,setPassword] = useState('');
   const [Confirm,setConfirm] = useState('');
   const navigate = useNavigate();
    async function Submit(e){
     
      if(Confirm === Password){
       
        try{
           const token =  await axios.post('https://secret-app-backend.onrender.com/user/signup',{user:email,password:Password});
           
           localStorage.setItem('secret-app',token.data);
           console.log(token);
           navigate('/App');
          
           
        }
        catch(e){
          alert(e.response.data);
          console.log(e);
        }
      }
      else{
         alert("password and confirm password didnt match");
      }
      }


      useEffect(()=>{
         try{
       const check = localStorage.getItem('secret-app');
       
       if(check){
         navigate('/App');
       }
      }
      catch(e){
         console.log(e);
      }
      },[]);
    return(
        <section class="bg-black    ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
               Secret 
            </a>
            <div class="w-full bg-dark-blue rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Signup
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
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="password" id="confirm_password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>{setConfirm(e.target.value)}}/>
                        </div>
                       
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div class="ml-3 text-sm">
                              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>{Submit(e)}}>Signup</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to = "/" className="text-black font-bold ">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    )
 
 }