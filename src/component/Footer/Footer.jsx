import React from 'react'
import * as Yup from 'yup'
import { useFormik, } from 'formik'

export default function Footer() {
  let validYup = Yup.object({
    email: Yup.string().required('email Required').email('enter valid email'),
  })
  let emailFooter = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validYup,
  })
  return (
    <div className='bg-gray-200 min-h-56 '>
      <div className='w-11/12 mx-auto py-3'>
        <h1 className='font-medium '>Get the frechCart app.</h1>
        <h5 className='text-gray-500 text-sm'>We will send you a link, open it in your phone to download app.</h5>
      </div>
      <div className=' flex justify-center items-center mx-auto w-10/12 pb-4 gap-2 border-b border-gray-400'>
        <input
          value={emailFooter.values.email}
          onChange={emailFooter.handleChange}
          onBlur={emailFooter.handleBlur}
          type="email"
          id="email"
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="jon123@gmail.com"
          required
        />
        {emailFooter.touched.email && emailFooter.errors.email ? <p className='text-red-800'>{emailFooter.errors.email}</p> : ""}
        <button className=' bg-active rounded p-2 text-white hover:bg-green-700 '>
          Share app Link
        </button>

      </div>
      <div className='flex justify-between items-center mx-auto w-10/12 gap-2 mt-2  pb-4 gap-2 border-b border-gray-400'>
        <div className='flex items-center gap-2 '>
          <h2 className='sm:text-[8px] md:text-sm lg:text-base'>Payment Partnes</h2>
            <i className="fa-brands fa-amazon-pay" />
            <i className="fa-brands fa-cc-paypal" />
            <i className="fa-brands fa-cc-mastercard" />
        </div>
        <div className='flex items-center gap-2'>
          <h2 className='sm:text-[8px] md:text-sm lg:text-base'>Get deliveries with FrechCart</h2>
            <i className="fa-brands fa-app-store-ios text-3xl" />
            <i className="fa-brands fa-google-play text-3xl" />
        </div>
      </div>
    </div>
  )
}
