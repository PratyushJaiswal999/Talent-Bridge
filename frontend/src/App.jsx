import { useState, useEffect } from 'react'
import './App.css'

import { testBackend } from "./api"; // <-- import API function
import { SignedOut, SignInButton,SignedIn , SignOutButton , UserButton} from '@clerk/clerk-react';

function App() {
  return (
    <>
      <h1>Welcome to the APP</h1>
      <SignedOut>
        <SignInButton mode='modal'>
          <button>GET STARTED</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>

      <UserButton/>

    </>
  )
}

export default App
