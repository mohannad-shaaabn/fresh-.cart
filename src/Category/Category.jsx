import React from 'react'
import useApi from '../component/useApi/useApi'

export default function Category() {
  let { isLoading, data } = useApi('categories')
  return <>
    {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen'></div> :
    <div className='w-11/12 lg:w-10/12 mx-auto flex flex-wrap justify-center gap-4 my-6'>
        {data?.data?.data?.map((category) => (
      <div key={category._id} className="text-center w-full sm:w-[47%] md:w-[31%] lg:w-[23%]">
        <img src={category.image} alt={category.name} className='h-52 sm:h-60 md:h-64 object-cover w-full object-top rounded-md' />
        <h5 className='mt-2' >{category.name}</h5>
      </div>
    ))}
    </div>
}
  </>
}
