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
        <div className="flex flex-wrap justify-center gap-4">
          {data?.data?.data?.map((brand) => (
            <div key={brand._id} className="text-center w-1/5">
              <img src={brand.image} alt={brand.name} className='h-64 object-cover w-full object-top' />
              <h5 className='mt-2'>{brand.name}</h5>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
