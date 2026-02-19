import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

export default function ShipngDetals() {
  const { id } = useParams();

  const headerOptions = {
    headers: {
      token: localStorage.getItem("token"),
    }
  };

  const validationSchema = Yup.object({
    phone: Yup.string().required('phone Requaired').matches(/^(20)?01[1250][0-9]{8}$/, "enter valid phone"),
    city: Yup.string().required('city Requaired'),
    details: Yup.string().required('details Requaired'),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleCheckout,
    validationSchema,
  });

  function handleCheckout(values) {
    const data = {
      shippingAddress: values
    };
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`, data, headerOptions)
      .then((res) => {
        window.open(res.data.session.url);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }

  return (
    <div className='w-9/12 m-auto'>
      <h1>Shipping Form</h1>
      <form onSubmit={formik.handleSubmit} className="mt-2 w-full mx-auto">
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City:</label>
          <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
          {formik.touched.city && formik.errors.city && <p className='text-red-800'>{formik.errors.city}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
          <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
          {formik.touched.phone && formik.errors.phone && <p className='text-red-800'>{formik.errors.phone}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details:</label>
          <textarea name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
          {formik.touched.details && formik.errors.details && <p className='text-red-800'>{formik.errors.details}</p>}
        </div>

        <button type="submit" className="btn">Check out</button>
      </form>
    </div>
  );
}
