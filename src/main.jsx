import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App.jsx"
import Loading from "@/pages/result/load.jsx"
import "./index.less"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>
)
