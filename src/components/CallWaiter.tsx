import React, {useState} from 'react'
import { Button } from '@/components/ui/button';
import { BellRing } from 'lucide-react';
import Swal from 'sweetalert2'



const CallWaiter = () => {
  const handleModal = () => {
        Swal.fire({
          icon: 'success',
          title: 'Has llamado a un mesero',
          text: 'Un mesero te atenderá pronto',
          timer: 2500,
          showConfirmButton: false
        }); 
  }


  return (
      <div className='flex fixed right-3 bottom-3 z-[999] justify-center items-center bg-amber-500 pl-6 py-1 rounded-xl pr-3 hover:bg-amber-400 hover:cursor-pointer'>
        <BellRing className='bell'/>
        <Button onClick={handleModal} variant='ghost' className='text-[16px] font-semibold hover:bg-transparent'>Listo para ordenar</Button>
      </div>
  )
}

export default CallWaiter