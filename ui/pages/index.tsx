import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import Hero from '../components/Hero'
import { auth } from '../firebase/client'
import Login from '../components/auth/Login'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useWithAuth } from '../hooks'


const Home: NextPage = () => {
  const [user,loading]=useAuthState(auth)
  const router=useRouter()
 useWithAuth(router.pathname)
  return (
    <div className={styles.container}>
      <Head>
        <title>eventQ</title>
        <meta name="description" content="ask questions in events " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Hero/>
      </main>

     
    </div>
  )
}

export default Home
