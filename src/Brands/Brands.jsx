import React from 'react'
import useApi from '../component/useApi/useApi'

export default function Brands() {
  let { isLoading, data } = useApi('brands')

  return (
    <>
    <div className="pt-24"></div>
      {isLoading ? (
        <div className='bg-slate-300 flex justify-center items-center h-screen'>
          <span className="loader"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 px-3 md:px-0">

          {data?.data?.data?.map((brand) => (
            <div
              key={brand._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 text-center"
            >
              <div className="p-3 border rounded-lg hover:shadow-lg transition">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-40 md:h-56 w-full object-contain"
                />
                <h5 className="mt-2 font-medium">{brand.name}</h5>
              </div>
            </div>
          ))}

        </div>
      )}
    </>
  )
}