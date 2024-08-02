import {React,useState} from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth';
import app from './firebase/firebase';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';
import { addDoc } from 'firebase/firestore';
import { usersref } from './firebase/firebase';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [form,setform]=useState({
    namee:"",
    mobile:"",
    password:"",
  }); 
  const[loading,setloading]=useState(false);
  const[sentotp,setsentotp]=useState(false);
  const[OTP,setOTP]=useState("");

  const generateRecaptha=()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container',{
      'size':'invisible',
      'callback':(response)=>{
       

      }
    },auth);
  }

  const requestOTP=()=>{
    setloading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier).then((confirmationResult)=>{
      window.confirmationResult = confirmationResult;
      swal({
        text:"OTP SENT",
        icon:"success",
        button:false,
        timer:3000,
      });
      setsentotp(true);
      setloading(false);
    })
      
    }

    const verifyOTP =()=>{
      try {
        setloading(true);
        window.confirmationResult.confirm(OTP).then((result)=>{
         uploadData();
          swal({
            text:"Successfully Registered",
            icon:"success",
            buttons:false,
            timer:3000,
          });
          navigate('/login')
          setloading(false);
        })    
      } catch (error) {
        console.log(error);
      }
    }
    const uploadData=async()=>{
      try{
      const salt=bcrypt.genSaltSync(10);
      var hash=bcrypt.hashSync(form.password,salt);
      await addDoc(usersref,{
        namee: form.namee,
        password: hash,
        mobile:form.mobile
      });
    }catch(err){
      console.log(err);
    }}
  return (
    <div className='w-full flex flex-col mt-8 items-center '>
       <h1 className='text-xl font-bold'>Signup</h1>      
      { sentotp ?      
      <>       
       <div class="p-2 w-1/3 md:w-1/3">
      <div class="relative">
        <label for="message" class="leading-7 text-sm text-black">
          OTP
        </label>
        <input          
          id="message"
          name="message"
          value={OTP}
          onChange={(e)=>setOTP(e.target.value)}
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
        />
      </div>
    </div>
    <div class="p-2 w-full">
                <button onClick={verifyOTP} class="flex mx-auto text-black bg-green-600 border-1 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"/>:'Confirm OTP'}
                </button>
              </div>
    </>
      :
        <>    
      <div class="p-2 w-1/3 md:w-1/3">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-black">
                    Username
                  </label>
                  <input
                    
                    id="message"
                    name="message"
                    value={form.namee}
                    onChange={(e)=>setform({...form,namee:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"                                      
                 />
                </div>
              </div>
      <div class="p-2 w-1/3 ">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-black">
                    Contact Number
                  </label>
                  <input
                    type={'number'}
                    id="message"
                    name="message"
                    value={form.mobile}
                    onChange={(e)=>setform({...form,mobile:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  
              />
                </div>
              </div>

              <div class="p-2 w-1/3 md:w-1/3">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-black">
                   Password
                  </label>
                  <input
                    type={'password'}
                    id="message"
                    name="message"
                    value={form.password}
                    onChange={(e)=>setform({...form,password:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
                </div>
              </div>

              <div class="p-2 w-full">
                <button onClick={requestOTP} class="flex mx-auto text-black bg-green-600 border-1 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white"/>:"Request OTP"}
                </button>
              </div>
              </>}
              <div>
                <p className='text-black'>Already have an account?<Link to={'/Login'}><span className='text-white' >Login</span>
                </Link> </p>
              
              </div>
              <div id='recaptcha-container'> 

              </div>
              </div>
    );
  };
  


export default Signup;
