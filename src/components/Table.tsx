import {useState} from 'react'
import {Response} from './types/response'


  type listData = {
    isPending:boolean, 
    isError:boolean, 
    isSuccess:boolean, 
    isFetching:boolean,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    pageNumber: number,
    isPlaceholderData: boolean,
    data:Response
  }
  type TableData = {
    listData: listData,
    toggleFavorite: (id: string) => void; 
    toggleClipboard: (id: string) => void; 
  }
  
  type favouriteType = {
    [key: string]:boolean
  }
  export const Table = ({listData, toggleFavorite, toggleClipboard} : TableData) => {
   
    const {isPending, isError, isFetching, isSuccess, setPageNumber, pageNumber, isPlaceholderData, data} =  listData;
    const [favorite, setFavorite] = useState<favouriteType>({});
    
    const toggleFavoriteEvent = (id:string) => {
      if(favorite[id]){
        const newFavourite = favorite
        delete newFavourite[id]
        setFavorite((prev)=>({...newFavourite}))
      }else{
        setFavorite((prev)=>({...prev, [id]:true}))
      }
      toggleFavorite(id);
    }

    console.log(data, pageNumber, favorite)

    const toggleClipboardEvent = (id:string) => {
      toggleClipboard(id);
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8">
         {
            isPending ? (<div>This is a loading page</div>): 
            isError ? (<div>This is an error page</div>) :
            (
            <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-3 uppercase truncate">Unique ID</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase">Originator</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase">Originator Country</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase">Owner</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase">Owner Country</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase">Status</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                        <span className="sr-only"></span>
                      </th>
                    </tr>
                  </thead>
                
                  <tbody>
                    {data.result.data.map((val, index) => (
                      <tr className="shadow-sm bg-white" key={index}>
                      <td className="has-tooltip cursor-pointer whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3" onClick ={() => toggleClipboardEvent(val.uniqueNumber)}>
                        <span className='tooltip p-1 bg-gray-500 text-white'>Click to copy the certificate id</span>
                       {val.uniqueNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val.companyName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val.carbonCertificateOwnerAccount.carbonUser.company.address.country}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val.carbonCertificateOwnerAccount.carbonUser.company.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val.countryCode}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val.status}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill={ favorite[val.uniqueNumber] ? "currentColor": "none" } viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick ={() => toggleFavoriteEvent(val.uniqueNumber)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                      </td>
                    </tr>
                    ))}
                    
                  
                  </tbody>
                </table>
                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                  aria-label="Pagination"
                  >
                  <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{data.result.meta.currentPage}</span> to <span className="font-medium">{data.result.meta.itemsPerPage}</span> of{' '}
                      <span className="font-medium">{data.result.meta.totalItems}</span> results
                      </p>
                  </div>
                  <div className="flex flex-1 justify-between sm:justify-end">
                      <button
                      className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      onClick={() => setPageNumber((pageNumber) => Math.max(pageNumber - 1, 1))} 
                      disabled={pageNumber === 1}
                      >
                      Previous
                      </button>
                      <button
                     
                      className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                      onClick={() => {
                        setPageNumber((pageNumber) => (data.result.meta.currentPage != data.result.meta.totalPages ? pageNumber + 1 : pageNumber))
                      }}
                      disabled={isPlaceholderData || data.result.meta.currentPage == data.result.meta.totalPages}
                      >
                      Next
                      </button>
                      { isFetching ? <span> Loading...</span> : null}
                  </div>
                  </nav>
              </div>
            </div>
          </div>
            )

          }
      
    </div>
    );
  }