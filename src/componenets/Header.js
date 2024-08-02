import {React, useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className='sticky z-10 header top-0 text-3xl flex justify-between items-center font-bold border p-2 b-4 border-gray-500'>
      <Link to={'/'}><span> APNA<span className='text-black sticky'> JODHPUR</span></span></Link>
      {useAppstate.login ?
     <Link to={'/addmovie'}><h1 className='text-lg cursor-pointer'> 
      <Button><AddIcon className="mr-2" color='secondary'/><span className='text-white'>Add Dish      </span></Button>
      </h1>     </Link>
     :
     <Link to={'/login'}>
      <h1 className='text-lg bg-green-700 cursor-pointer'> 
      <Button><span className=' text-white'>Login
      </span>
      </Button>
      </h1>
     </Link>
    }
    </div>
  )
}

export default Header
