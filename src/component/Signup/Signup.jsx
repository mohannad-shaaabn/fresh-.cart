import axios from 'axios'
import { useFormik, } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function Signup() {
  let [errorMessage, setError] = useState(null)
  const baseUrl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()
  let validYup = Yup.object({
    name: Yup.string().required('name Required').min(3, 'min char is 2').max(20, 'max char 20'),
    email: Yup.string().required('email Required').email('enter valid email'),
    password: Yup.string().required('password Required').matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password invalid"),
    rePassword: Yup.string().required('rePassword Required').oneOf([Yup.ref('password')], "Repassword Not Matched"),
    phone: Yup.string().required('phone Requaired').matches(/^(20)?01[1250][0-9]{8}$/, "enter valid phone")
  })
  let registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    onSubmit: registerApi,
    validationSchema: validYup,
  })
  async function registerApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        console.log(req.data);
        if (req.data.message == "success") {
          navg("/Login")
        }

      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      })
  }

  return (
    <section className='w-11/12 sm:w-10/12 lg:w-8/12 xl:w-7/12 mx-auto my-8'>
      <div className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm'>
        <h2 className='text-3xl font-semibold text-slate-800'>Create your account</h2>
        <p className='mt-2 text-sm text-slate-500'>Register to start ordering quickly and track your cart.</p>

        {errorMessage ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </div> : ""}

        <form onSubmit={registerForm.handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
            <input value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} type="text" name='name' id="name" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="Your full name" required />
            {registerForm.touched.name && registerForm.errors.name ? <p className='mt-1 text-sm text-red-600'>{registerForm.errors.name}</p> : ""}
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} type="email" name='email' id="email" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="name@example.com" required />
              {registerForm.touched.email && registerForm.errors.email ? <p className='mt-1 text-sm text-red-600'>{registerForm.errors.email}</p> : ""}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
              <input value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} type="tel" name='phone' id="phone" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="01012345678" required />
              {registerForm.touched.phone && registerForm.errors.phone ? <p className='mt-1 text-sm text-red-600'>{registerForm.errors.phone}</p> : ""}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} type="password" name='password' id="password" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="Create password" required />
              {registerForm.touched.password && registerForm.errors.password ? <p className='mt-1 text-sm text-red-600'>{registerForm.errors.password}</p> : ""}
            </div>
            <div>
              <label htmlFor="rePassword" className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
              <input value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} type="password" name='rePassword' id="rePassword" className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" placeholder="Repeat password" required />
              {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className='mt-1 text-sm text-red-600'>{registerForm.errors.rePassword}</p> : ""}
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-slate-600'>Already have an account? <Link to="/Login" className='font-medium text-active'>Login</Link></p>
            <button disabled={!(registerForm.isValid && registerForm.dirty)} type="submit" className="btn sm:w-auto sm:px-8 disabled:cursor-not-allowed disabled:opacity-60">Create account</button>
          </div>
        </form>
      </div>
    </section>
  )
}
