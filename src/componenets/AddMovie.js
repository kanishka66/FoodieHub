import React, { useContext, useState } from "react";
import {TailSpin} from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { dishrev } from "./firebase/firebase";
import swal from 'sweetalert';
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const useAppstate = useContext(Appstate);
  const navigate= useNavigate();
  const [form,setform]=useState({
    ShopName:"",
     Dish :" ",
    Description:"",
    image: "",
    rated:0,
    rating:0
  });
  const[loading,setloading]=useState(false);
   
  const addDish = async()=>{
    setloading(true);
   try {
    if(useAppstate.login){
    await addDoc(dishrev,form);
   swal({
    title:"Successfully added",
    icon:"success",
    buttons:false,
    timer:3000,

   })
   setform({
    ShopName:"",
     Dish :" ",
    Description:"",
    image: "",
   })}
   else{
    navigate('/login') }
   setloading(false);
  } catch (error) {
    swal({
     
      icon:"error",
      buttons:false,
      timer:3000,
    })
  }
 
  }
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Time to add your favourite dish!!!!!
            </h1>            
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-black">
                    ShopName
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.ShopName}
                    onChange={(e)=>setform({...form,ShopName:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-black">
                    Dish
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.Dish}
                    onChange={(e)=>setform({...form,Dish:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-black">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={(e)=>setform({...form,image:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  
                    
                  ></input>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-black">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.Description}
                    onChange={(e)=>setform({...form,Description:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addDish} class="flex mx-auto text-black bg-green-600 border-1 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"/>:'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
