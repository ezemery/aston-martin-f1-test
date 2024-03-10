import {useState, useEffect} from 'react'
import {
    useQuery,
    keepPreviousData,
    useQueryClient,
  } from '@tanstack/react-query'

type LayoutProps = {
    getData : (pageNumber: number) => Promise<any>,
    render : (data:any) => React.JSX.Element
}


export const Layout = ({getData, render}: LayoutProps) => {
    const queryClient = useQueryClient(); 
    const [pageNumber, setPageNumber] = useState(1);
    const { isPending, isError, isFetching, isSuccess, data, isPlaceholderData } = useQuery({
        queryKey: ['farmData', pageNumber],
        queryFn: () => getData(pageNumber),
        placeholderData: keepPreviousData,
        staleTime: 5000,
      })

       // Prefetch the next page!
        useEffect(() => {
          if (!isPlaceholderData && data?.hasMore) {
            queryClient.prefetchQuery({
              queryKey: ['farmData', pageNumber + 1],
              queryFn: () => getData(pageNumber + 1),
            })
          }
        }, [data, isPlaceholderData, pageNumber, queryClient])

    return render({isPending, isError, isFetching, isSuccess, setPageNumber, isPlaceholderData, pageNumber, data});
}