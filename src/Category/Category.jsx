import React from 'react'
import useApi from '../component/useApi/useApi'

export default function Category() {
  let { isLoading, data } = useApi('categories')
  return <>
    {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen'></div> : 
    <div className='flex flex-wrap justify-center'>
        {data?.data?.data?.map((category) => (
      <div key={category._id} className="text-center">
        <img src={category.image} alt={category.name} className='h-64 object-cover w-full object-top' />
        <h5 className='mt-2' >{category.name}</h5>
      </div>
    ))}
    </div>
}
  </>
}
