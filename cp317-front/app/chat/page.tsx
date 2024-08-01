'use client';
import React from 'react'
import AuthContext from '../components/AuthContext';
import { useContext } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const page = () => {
    const Context = useContext(AuthContext);
  return (
    <div>
      {Context?.isAuthenticated ? (
        <div>
            <NavBar/>
        </div>
      ):(
        <div>
            
            <Link href='/login'>login</Link>
        </div>

      )
      }
    </div>
      
  )
}

export default page
