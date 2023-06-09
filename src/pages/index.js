import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    // Verificar si el usuario ya inició sesión
    const isLoggedIn = checkIfUserIsLoggedIn()
    isLoggedIn ?  router.push('/') :  router.push('/login')
  }, [])

  const checkIfUserIsLoggedIn = () => {
    if(localStorage.getItem('sessionToken')){
      return true
    }else{
      return false
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
