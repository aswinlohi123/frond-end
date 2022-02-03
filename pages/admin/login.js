import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

const Index = () => {

  // 1. local state management for email and password
  const [us_email, setEmail] = useState('')
  const [us_password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  

  // this helps with routing
  const router = useRouter()

  // The empty '' in the useState() function are default values
  // If you pass 'leo' to the email, that will be the default of your email field useState('leo')

  // this funtions handles when the form is submitted
  const handleSubmit = async e => {

    e.preventDefault()

    // you now have access to your email and password entered by the user here (email, password

    setIsLoading(true)

    // you can check your logs to see what you entered in the email and password
    // Now you will connect to an authentication backend I created with axios

    // my backend requires you pass an object with the following structure (identifier for email and password)
    const login_payload = { us_email, us_password }
    console.log('data',login_payload)

    try {
      const url = 'http://localhost:8000/api/log';
      const res = await axios.post(url, login_payload).then(val =>{
        console.log('val',val)
        if (val.status === 200) {
          localStorage.setItem('token', val?.data?.jwt)
          // if login is successful, redirect to dashboard
          router.replace('/dashboard')
        }
  
      })
      
    } catch (err) {
      // else this code will run
      alert('An error occured logging in. Check your credentials')
    } finally {
      setIsLoading(false)
    }

  }

  return (
    // this is your UI
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="p-5 border flex items-center rounded-lg h-2/3 md:h-1/2 w-4/5 md:w-1/3 bg-white">
        {/* this is your form */}
        <form onSubmit={handleSubmit} className='space-y-4 px-5'>
          {/* your email field. link this to your state by adding a value property to your input */}
          {/* Also listen to when the user types by adding the onChange event handler */}
          <input
           
            onChange={e => setEmail(e.target.value)}
            type='text'
            placeholder='email'
            className='border p-2 w-full border-gray-200 focus:border-gray-400 outline-none'
          />
          <input
            
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            className='border p-2 w-full border-gray-200 focus:border-gray-400 outline-none'
          />
          <button type='submit' className='p-2 w-full bg-blue-400 hover:bg-blue-500 duration-300 text-center text-white'>
            {isLoading ? '...loading' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Index