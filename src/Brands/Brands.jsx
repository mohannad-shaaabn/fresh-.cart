import React from 'react'
import useApi from '../component/useApi/useApi'

export default function Brands() {
  let { isLoading, data } = useApi('brands')

  return (
    <>
      {isLoading ? (
        <div className='bg-slate-300 flex justify-center items-center h-screen'>
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-11/12 lg:w-10/12 mx-auto flex flex-wrap justify-center gap-4 my-6">
          {data?.data?.data?.map((brand) => (
            <div key={brand._id} className="text-center w-full sm:w-[47%] md:w-[31%] lg:w-[23%]">
              <img src={brand.image} alt={brand.name} className='h-52 sm:h-60 md:h-64 object-cover w-full object-top rounded-md' />
              <h5 className='mt-2'>{brand.name}</h5>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
