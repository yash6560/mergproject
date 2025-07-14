import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const {logIn, isLoading} = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault();
      const res = await logIn(formData);
      if(res?.success){
        toast.success("Login successfully.");
        navigate('/');
      } else {
      toast.error(res?.message);
    }

    }
  
  return (
    <div className='h-screen flex items-center justify-center bg-base-200 p-4'>
      <div className='max-w-2xl w-full border border-base-100 rounded-xl bg-base-300 flex items-center'>
        {/* image */}
        <div className="hidden md:table max-w-sm w-1/2 overflow-hidden"><img src='./login.png' className='w-full h-full object-cover'/></div>
        {/* text */}
        <div className='md:w-1/2 w-full p-4 flex items-center'>
        <form className='w-full' onSubmit={handleSubmit}>
        <h1 className='font-bold text-center text-2xl pb-4 text-primary'>LogIn Here</h1>
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-4" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-4" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
        <button type='submit' className='btn btn-primary w-full'>{isLoading ? "Login..." : "Log In"}</button>
        <p className='text-xs text-center p-4'>If you don't have Account? <Link to="/signup" className="text-primary hover:underline font-semibold">SignUp</Link></p>
        </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage