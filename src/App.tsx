import React from 'react';
import './style/index.css';
import './style/base.css';
import { Layout } from './layout/Layout';
import {Table} from './components/Table' 
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  const loadResource = (pageNumber:number) => {
    return fetch(
      `https://demo.api.agreena.com/api/public/carbon_registry/v1/certificates?includeMeta=true&page=${pageNumber}&limit=10`,
      {
        headers: {
          "API-ACCESS-TOKEN": "Commoditrader-React-FE-Farmer",
        }
        
      }
    ).then((res) => res.json())
  };

  const toggleFavorite = (id: string) => {
    if(localStorage.getItem(id)){
      localStorage.removeItem(id);
    }else{
      localStorage.setItem(id, id);
    }
  }

  const toggleClipboard = (id: string) => {
    (async () => {
      try {
        await navigator.clipboard.writeText(id);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  )()
  
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Layout getData={loadResource} render={(data) => <Table toggleClipboard={toggleClipboard} toggleFavorite={toggleFavorite} listData={data}/>}/>
      </div>
    </QueryClientProvider> 
  );
}

export default App;
