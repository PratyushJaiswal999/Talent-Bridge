import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { testBackend } from "./api"; // <-- import API function

function App() {
  const [count, setCount] = useState(0)
  const [backendMsg, setBackendMsg] = useState("");

  useEffect(() => {
    // call backend on page load
    testBackend().then((data) => {
      if (data?.msg) {
        setBackendMsg(data.msg);
      }
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      {/* Show backend response */}
      <h2 style={{ color: "lightgreen" }}>
        Backend says: {backendMsg || "Loading..."}
      </h2>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
