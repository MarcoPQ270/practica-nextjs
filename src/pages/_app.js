import '@/styles/globals.css'

import NavBar from '../components/header.js'

export default function App({ Component, pageProps }) {
  return <>
   <NavBar/>
    <Component {...pageProps} />
    
  </> 
}
