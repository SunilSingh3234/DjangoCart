import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function Signup(){

     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
     const [form,setForm]=useState({username:'',email:'',password:'',password2:''})
     const [msg,setMsg]=useState('')
     const navigate = useNavigate()

     const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
     }

     const handleSubmit = async (e) => {
        e.preventDefault()
        setMsg('')
        try {
            const res = await fetch(`${BASEURL}/api/register/`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(form)

            })
            const data = await res.json()
            if(res.ok){
                setMsg("Account Created! Redirecting to Login...")
                setTimeout(()=>{
                    navigate("/login")
                },2000)
            }else{
                setMsg(data.username || data.password || JSON.stringify(data))
            }
        } catch (error) {
            console.error("Signup error:", error)
            setMsg("An error occurred. Please try again.")
        }
     }
  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
        <div className='max-w-md w-full bg-white p-6 rounded shadow'>
            <h2 className='text-2xl mb-4 font-bold'>Sign Up</h2>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <input type="text" name='username' onChange={handleChange} value={form.username} required placeholder='Enter Your name' className='w-full p-2 border rounded' />
                <input type="email" name='email' onChange={handleChange} value={form.email} required placeholder='Enter Your email' className='w-full p-2 border rounded' />
                <input type="password" name='password' onChange={handleChange} value={form.password} required placeholder='Enter Your password' className='w-full p-2 border rounded' />
                <input type="password" name='password2' onChange={handleChange} value={form.password2} required placeholder='Confirm Your password' className='w-full p-2 border rounded' />
                <button className='w-full bg-blue-600 text-white py-2 rounded'>Create Account</button>
            </form>
            {msg && <p className='mt-3 text-sm'>{msg}</p>}
            <div className='mt-4 text-sm'>
                Already Registered?{""}
                <a href="/login" className='text-blue-600 hover:underline'>Login</a>
            </div>
        </div>
      
    </div>
  )
}

export default Signup
