import React from 'react'
import { useToast } from '../context/ToastContext'

const Home = () => {
    const {addToast} = useToast()
    const handler = () => {
        addToast('Hello World', 'info', 5000)
    }
  return (
    <div>
      <button onClick={handler} className='bg-red-400 p-6'>Hello</button>
    </div>
  )
}

export default Home
