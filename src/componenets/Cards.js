import React, { useEffect, useState } from 'react'
import {  BallTriangle} from 'react-loader-spinner';
import ReactStars from 'react-stars'
import {getDocs} from 'firebase/firestore';
import{dishrev} from './firebase/firebase';
import{Link} from 'react-router-dom';


const Cards = () => {
  const [data, setData]=useState([]);
  const [loading,setloading]=useState(false);

  useEffect(()=>{
    async function getData(){
      setloading(true) ;
      const _data= await getDocs(dishrev);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv,{...(doc.data()),id: doc.id}])
      })
      
      setloading(false);
    }
    getData();
  },[])

  return (
    <div className='flex flex-wrap justify-between p-3 mt-2'>
      { loading ? <div className="w-full flex justify-center h-96"><BallTriangle height={400} color="white"/></div>:
      data.map((e,i)=>{
        return(
          <Link to={`/detail/${e.id}`}><div key={i} className='card shadow-lg hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
          <img className='h-40 md:h-25' src={e.image}/>
           
         
        <h1>
          <span className='text-black'>Name:</span>{e.Dish}
          </h1>
          <h1>
          <span className='text-black'>Rating:</span>
          <ReactStars
          size={20}
          half={true}
          value={e.rating}
          edit={false}
          />
          </h1>
          <h1 className='
          flex items-center mr-1  '>
          <span className='text-black'>Best Shop:</span>{e.ShopName}
          </h1>
          </div></Link>
        )
      })}
      
    </div>
  )
}

export default Cards
