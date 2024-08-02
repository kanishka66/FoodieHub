import React, { useEffect ,useState} from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from './firebase/firebase'
import { doc,getDoc} from 'firebase/firestore'
import { BallTriangle } from 'react-loader-spinner'
import Reviews from './Reviews'


const Detail = () => {
  const {id}=useParams();
  //window.alert(id);
  const[data,setData]=useState({
    ShopName:"",
     Dish :" ",
    Description:"",
    image: "",
    rating:0,
    rated:0,
  }
  );
  const [loading,setloading]=useState(false);
  useEffect(()=>{
   async function getData(){
    setloading(true);
   const _doc = doc(db,"dishes",id);
   const _data=await getDoc(_doc);
    setData(_data.data());
    setloading(false);
   }
   getData();
  },[])
  return (
    <div className='p-4 mt-4 flex  flex-col md:flex-row  md:items-start  justify-center'>
      {loading ? <div className=' w-full  flex justify-center h-96 items-center' ><BallTriangle height={400} color='white' /></div>:
        <>
      <img  className='h-60 sticky top-12' src={data.image}  />
      <div className='md:ml-4 ml-0 w-full md:w-1/2'>
        <h1 className='text-3xl font-bold text-gray-700 sticky'>{data.Dish}<span>({data.ShopName})</span></h1>
        <ReactStars
          size={20}
          half={true}
          value={data.rating/data.rated}
          edit={false}
          />
        <p className='text-gray-700 text-center mt-2'>{data.Description}</p>
        <Reviews id={id} prevRating={data.rating} userrated={data.rated}/>
      </div>
      </>
}
    </div>
  )
}

export default Detail
