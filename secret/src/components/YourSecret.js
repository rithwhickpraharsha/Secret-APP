import axios from "axios";
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";


export default function YourSecret(){
const navigate = useNavigate();


const [secret,setSecret] = useState([]);
async function Remove(){
    try{
        const token= localStorage.getItem('secret-app');
      await axios.post('http://localhost:5000/secret/remove',{token:token});
    }
    catch(e){
        console.log(e);
        alert(e.response.data);
    }

}
useEffect(()=>{
    async function show(){
        const token= localStorage.getItem('secret-app');
        if(!token)navigate("/");
        const data = await axios.post('http://localhost:5000/secret/show/user',{token:token});

        setSecret(data.data);
    }
    const check= localStorage.getItem('secret-app');
    if(!check){
        navigate('/');
    }
show();
},[secret]);
return(
    <div className="bg-black h-screen">
        <h1 className="bg-gray-dark h-10 md:h-15 lg:h-20 text-white font-pacifico text-2xl md:text-3xl lg:text-4xl  flex justify-center m-auto">Your Secrets</h1>
       <div className="flex flex-row justify-end"> <button className="h-5 md:h-7 lg:h-10 text-white hover:bg-red hover:text-black   bg-dark-blue px-[2vh] mr-[1vh] border border-purple" onClick={(e)=>{Remove()}}>delete</button><button className="h-5 md:h-7 lg:h-10  text-white hover:bg-red hover:text-black   bg-dark-blue  px-[2vh] border border-purple" onClick={()=>{localStorage.removeItem('secret-app'); navigate("/")}}>Logout</button></div>
        {
        secret.map((x,i)=>{
         return (<div className="h-auto w-auto bg-dark-blue my-5 ">
            <h1 className="text-white text-xl md:text-2xl lg:text-5xl flex justify-center border border-green h-8 md:h-12 lg:h-16 overflow-auto">{x.category}</h1>

            <h1 className="text-white text-xl md:text-2xl lg:text-3xl my-2 border border-green h-48 md:h-36 sm:h-24 overflow-auto px-2">{x.secret}</h1>

            </div>)
        })
        }
    </div>
);



}