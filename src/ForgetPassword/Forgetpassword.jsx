import axios from 'axios'
import { useFormik, } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function Forgetpassword() {
    let [errorMessage, setError] = useState(null)
    let [formDisplay, setformDisplay] = useState(true)
    const baseUrl = 'https://ecommerce.routemisr.com'
    let navg = useNavigate()
    let validYup = Yup.object({
        email: Yup.string().required('email Required').email('enter valid email'),
    })
    let valid2Yup = Yup.object({
        resetCode: Yup.string().required('resetCode Required')
    })
    let forgetForm = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: forgetPasswordApi,
        validationSchema: validYup,
    })
    let verifyResetCodeForm = useFormik({
        initialValues: {
            resetCode: '',
        },
        onSubmit: verifyResetCodeApi,
        validationSchema: valid2Yup,
    })
    function verifyResetCodeApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
            .then((req) => {
                if (req.data.status == "Success") {
                    navg('/updatepassword')
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
    }
    function forgetPasswordApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                console.log(req.data);
                if (req.data.statusMsg == "success") {
                    setformDisplay(false)
                }

            })
            .catch((err) => {
                setError(err.response.data.message);
            })
    }

    return (
        <>
            {formDisplay ? <div className='w-9/12 m-auto'>
                <h2 className='font-bold mt-4'>Forget Password :</h2>

                {errorMessage ? <div className="text-center w- p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errorMessage}
                </div> : ""}

                <form onSubmit={forgetForm.handleSubmit} className="w-full mt-2">

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                        <input value={forgetForm.values.email} onChange={forgetForm.handleChange} onBlur={forgetForm.handleBlur} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        {forgetForm.touched.email && forgetForm.errors.email ? <p className='text-red-800'>{forgetForm.errors.email}</p> : ""}
                    </div>



                    <button disabled={!(forgetForm.isValid && forgetForm.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-abg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-abg-active disabled:bg-active disabled:bg-opacity-25">Send</button>
                </form>


            </div> : <div className='w-9/12 m-auto'>
                <h2 className='font-bold mt-4'>reset code :</h2>

                {errorMessage ? <div className="text-center w- p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errorMessage}
                </div> : ""}

                <form onSubmit={verifyResetCodeForm.handleSubmit} className="w-full mt-2">

                    <div className="mb-5">
                        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">resetCode</label>
                        <input value={verifyResetCodeForm.values.resetCode} onChange={verifyResetCodeForm.handleChange} onBlur={verifyResetCodeForm.handleBlur} type="string" name='resetCode' id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                        {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? <p className='text-red-800'>{verifyResetCodeForm.errors.email}</p> : ""}
                    </div>



                    <button disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-abg-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-abg-active disabled:bg-active disabled:bg-opacity-25">Verify Code</button>
                </form>


            </div>}



        </>

    )
}

