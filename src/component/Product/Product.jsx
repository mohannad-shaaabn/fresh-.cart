import useApi from '../useApi/useApi'

export default function Brands() {
  let { isLoading, data } = useApi('products');

  return (
    <>
      {isLoading ? (
        <div className='bg-slate-300 flex justify-center items-center h-screen'>
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-11/12 lg:w-10/12 mx-auto flex flex-wrap justify-center gap-4 my-6">
          {data?.data?.data?.map((product) => { 
            let { _id, imageCover, title } = product; 
            
            return (
              <div key={_id} className="text-center w-full sm:w-[47%] md:w-[31%] lg:w-[23%] shadow-md rounded-md my-2">
                <img 
                  src={imageCover} 
                  alt={title} 
                  className='object-cover w-full h-56 rounded-md' 
                />
               
              
              
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
