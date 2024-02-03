import React from "react"
import { Button } from "antd"
import { useState } from "react"
import reactLogo from "@/assets/react.svg"
import viteLogo from "/vite.svg"
import "./index.less"

function Demo() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Antd</h1>
      <br />
      <Button type="primary" onClick={() => setCount((count) => count + 1)}>
        Antd {count}
      </Button>
    </div>
  )
}

export default Demo
