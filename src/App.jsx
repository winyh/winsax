import React from "react"
import { Button } from "antd"
import { useState } from "react"
import { BrowserRouter as Router, useRoutes } from "react-router-dom"
import routes from "@/routes/index.jsx"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.less"

function App() {
  const genRouter = useRoutes(routes)
  return (
    <div>
      {/* <div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React + Antd</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <Button type="primary">Antd</Button>
        <p className="read-the-docs">点击 Vite and React logos 查看更多</p>
      </div> */}
      {genRouter}
    </div>
  )
}

export default App