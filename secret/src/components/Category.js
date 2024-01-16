import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function Category(){
    let {title} = useParams();
    const [secrets,setSecrets] = useState([]);
    let navigate = useNavigate();
    useEffect(()=>{
        async function getSecret(){
            try{
         const res = await axios.post("http://localhost:5000/secret/show/category",{category:title});
         setSecrets(res.data);
            }
            catch(err){
                console.log(err);
                alert(err.response.data);
            }

        }
        const check = localStorage.getItem('secret-app');
        if(!check){
            navigate('/');
        }
        getSecret();

    },[secrets]);

    return (
        <div className="bg-black h-screen">
        <div className="flex flex-col justify-around">
        {
        secrets.map((x,i)=>{
         return (
        <div className="h-24 w-auto overflow-auto bg-dark-blue text-white border border-green my-5 px-2">
            {x}
            </div>
            )
        })
        }
        </div>
        </div>
    )
}