import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

export default function ShipngDetals() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    const data = {
      shippingAddress: values
    };
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`, data, headerOptions)
      .then((res) => {
        window.location.href = res.data.session.url;
      })
      .catch((err) => {
        console.log(err.response?.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <section className='w-11/12 lg:w-10/12 mx-auto my-8'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
          <h1 className='text-3xl font-semibold text-slate-800'>Shipping Form</h1>
          <p className='mt-2 text-sm text-slate-500'>Enter your delivery details to continue secure checkout.</p>

          <form onSubmit={formik.handleSubmit} className="mt-6 w-full space-y-5">
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">City</label>
              <input type="text" name="city" id="city" placeholder='e.g. Cairo' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" required />
              {formik.touched.city && formik.errors.city && <p className='mt-1 text-sm text-red-600'>{formik.errors.city}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
              <input type="tel" name="phone" id="phone" placeholder='e.g. 01012345678' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" required />
              {formik.touched.phone && formik.errors.phone && <p className='mt-1 text-sm text-red-600'>{formik.errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="details" className="mb-2 block text-sm font-medium text-slate-700">Address details</label>
              <textarea rows="4" name="details" id="details" placeholder='Street, building, floor, apartment...' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-active focus:ring-2 focus:ring-green-100" required />
              {formik.touched.details && formik.errors.details && <p className='mt-1 text-sm text-red-600'>{formik.errors.details}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn w-full disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? 'Redirecting to payment...' : 'Continue to payment'}
            </button>
          </form>
        </div>

        <aside className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-fit'>
          <h2 className='text-lg font-semibold text-slate-800'>Why this step?</h2>
          <ul className='mt-4 space-y-3 text-sm text-slate-600'>
            <li><i className="fa-solid fa-circle-check me-2 text-active"></i>Confirm delivery location.</li>
            <li><i className="fa-solid fa-circle-check me-2 text-active"></i>Use phone for courier contact.</li>
            <li><i className="fa-solid fa-circle-check me-2 text-active"></i>Secure checkout opens in a new tab.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
