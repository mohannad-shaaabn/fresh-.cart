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
    <div className='w-9/12 m-auto'>
      <h2 className='font-bold mt-4'>Login Now :</h2>

      {errorMessage ? <div className="text-center w- p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errorMessage}
      </div> : ""}

      <form onSubmit={LoginFrom.handleSubmit} className="w-full mt-2">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
          <input value={LoginFrom.values.email} onChange={LoginFrom.handleChange} onBlur={LoginFrom.handleBlur} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          {LoginFrom.touched.email && LoginFrom.errors.email ? <p className='text-red-800'>{LoginFrom.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
          <input value={LoginFrom.values.password} onChange={LoginFrom.handleChange} onBlur={LoginFrom.handleBlur} type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          {LoginFrom.touched.password && LoginFrom.errors.password ? <p className='text-red-800'>{LoginFrom.errors.password}</p> : ""}
        </div>


        <Link to="/forgetPassword" className='hover:text-blue-800 text-blue-600 underline'>Forget Password ? </Link>
        <br />
        <button disabled={!(LoginFrom.isValid && LoginFrom.dirty)} type="submit" className="mt-2 text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-abg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-abg-active disabled:bg-active disabled:bg-opacity-25">Login</button>
      </form>


    </div>
  )
}

