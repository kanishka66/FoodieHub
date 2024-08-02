import React ,{ useContext, useEffect, useState }from 'react'
import ReactStars from 'react-stars'
import { reviewsref ,db} from './firebase/firebase'; 
import { addDoc,doc,updateDoc,query,where,getDocs } from 'firebase/firestore';
import { TailSpin,ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id,prevRating,userrated}) => {
    const useAppstate =useContext(Appstate);
    const navigate= useNavigate();
    const[rating,setrating]=useState(0);
    const[loading,setloading]=useState(false);
    const[form,setform]=useState("");
    const[data,setdata]=useState([]);
    const [reviewsloading,setreviewsloading]=useState(true);
    const[newAdded,setnewAdded]=useState(0);

    const sendreview=async()=>{
      setloading(true);
     try {
      if(useAppstate.login){
      await addDoc(reviewsref,{
        dishid:id,
        namee : useAppstate.username,
        rating:rating,
        thought:form,
        timestamp: new Date().getTime()
      })

      const ref=doc(db,"dishes",id);
      await updateDoc(ref,{
        rating:prevRating+rating,
        rated:userrated+1,
      })

      setrating(0);
      setform("");
      setnewAdded(newAdded+1);
      swal({
        title:"Review Sent",
        icon:"success",
        buttons:false,
        timer:3000    
       })}
       else{
       navigate('/login')
       }      
     } catch (error) {
      swal({
        title:error.message,
        icon:"error",
        buttons:false,
        timer:3000,    
       })      
     }
     setloading(false);
       }

       useEffect(()=>{
        async function getData(){
          setreviewsloading(true);
          setdata([]);
          let quer=query(reviewsref,where('dishid','==',id))
          const querySnapshot= await getDocs(quer);

          querySnapshot.forEach((doc)=>{
            setdata((prev)=>[...prev,doc.data()])
          })

          setreviewsloading(false);
        }
        getData();
       },[newAdded])
    
  return (
    <div className='w-full border-t-2  border-gray-700 '>
        <ReactStars
         size={30}
         half={true}
         value={rating}
         onChange={(rate)=>setrating(rate)}         
        />
     <input
     value={form}
     onChange={(e)=>setform(e.target.value)}
     placeholder='Share your experience...'
     className='w-full p-2 outline-none header text-black'
     />
     <button onClick={sendreview}className='bg-green-700 flex justify-center w-full '>
      { loading ? <TailSpin height={35} color="white"/>: 'Share'}
      </button>
      
      {reviewsloading ?
      //<div className='mt-6 flex justify-center'>
        <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white"/></div>
      :
      <div className='mt-4'>
      
        {data.map((e,i)=>{
          return(
            <div className='border-b bg-gray-700 p-2 w-full mt-2' key={i}>
              <div className='flex items-center'>
              <p className='text-blue-500'>{e.namee}</p>
              <p className='ml-2 text-xs'>({new Date(e.timestamp).toLocaleString()})</p></div>
              
              <ReactStars
                 size={15}
                 half={true}
                 value={e.rating}
                 edit={false}
                 />
              <p>{e.thought}</p>
           </div>
          )
        })}
       </div>}
       </div>
  )
}

export default Reviews
