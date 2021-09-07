import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";

import './custom.css'
import MainScreen from './components/MainScreen';

const queryClient = new QueryClient()

export default function App() {

    return(
        <QueryClientProvider client={queryClient}>
            <MainScreen/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )

}
