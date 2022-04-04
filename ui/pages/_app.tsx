/* eslint-disable @next/next/no-img-element */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'firebase/auth'
import 'firebase/firestore'
import { ToastContainer, } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/nav/NavBar';
import bg from '../public/images/bg.jpg'

 import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 const queryClient = new QueryClient()



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen relative'>

          <img src={bg.src} className='w-full bg-cover object-cover h-full bg-no-repeat absolute -z-10' alt=''></img>

  <NavBar/>
  <Component {...pageProps} />
      </div>
  </QueryClientProvider>
    )
}

export default MyApp
