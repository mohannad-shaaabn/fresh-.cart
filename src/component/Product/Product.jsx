import useApi from '../useApi/useApi'

export default function Brands() {
  let { isLoading, data } = useApi('products');
  console.log(data); 

  return (
    <>
      {isLoading ? (
        <div className='bg-slate-300 flex justify-center items-center h-screen'>
          <span className="loader"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {data?.data?.data?.map((product) => { 
            let { _id, price, imageCover, category, title, ratingsAverage } = product; 
            
            return (
              <div key={_id} className="text-center w-1/5 shadow-md  rounded-md my-4">
                <img 
                  src={imageCover} 
                  alt={title} 
                  className=' object-cover w-full object-top rounded-md ' 
                />
               
              
              
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
