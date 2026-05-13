import axios from 'axios'
import { useFormik, } from 'formik'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContextProvider'
export default function Login() {
  let { setToken } = useContext(AuthContext)
  let [errorMessage, setError] = useState(null)
  const baseUrl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()

  let validYup = Yup.object({
    email: Yup.string().required('email Required').email('enter valid email'),
    password: Yup.string().required('password Required').matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password invalid"),
  })
  let LoginFrom = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: LoginApi,
    validationSchema: validYup,
  })
  async function LoginApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        console.log(req.data);
        if (req.data.message == "success") {
          setToken(req.data.token)
          localStorage.setItem("token", req.data.token)
          navg("/home")
        }

      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      })
  }

  return (
    <section className='animate-fade-up w-11/12 sm:w-10/12 lg:w-8/12 xl:w-7/12 mx-auto my-8'>
      <div className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover-float'>
        <h2 className='text-3xl font-semibold text-slate-800'>Welcome back</h2>
        <p className='mt-2 text-sm text-slate-500'>Login to manage your orders and continue shopping.</p>

        {errorMessage ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </div> : ""}

        <form onSubmit={LoginFrom.handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input value={LoginFrom.values.email} onChange={LoginFrom.handleChange} onBlur={LoginFrom.handleBlur} type="email" name='email' id="email" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="name@example.com" required />
            {LoginFrom.touched.email && LoginFrom.errors.email ? <p className='mt-1 text-sm text-red-600'>{LoginFrom.errors.email}</p> : ""}
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input value={LoginFrom.values.password} onChange={LoginFrom.handleChange} onBlur={LoginFrom.handleBlur} type="password" name='password' id="password" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="Enter your password" required />
            {LoginFrom.touched.password && LoginFrom.errors.password ? <p className='mt-1 text-sm text-red-600'>{LoginFrom.errors.password}</p> : ""}
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <Link to="/forgetPassword" className='text-sm text-blue-600 underline hover:text-blue-800'>Forget Password?</Link>
            <Link to="/regester" className='text-sm text-slate-600'>No account? <span className='text-active font-medium'>Create one</span></Link>
          </div>

          <button disabled={!(LoginFrom.isValid && LoginFrom.dirty)} type="submit" className="btn mt-1 hover-pulse disabled:cursor-not-allowed disabled:opacity-60">Login</button>
        </form>
      </div>
    </section>
  )
}

