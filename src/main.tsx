import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// Bootstrap 5 - CSS фреймворк для быстрой стилизации
import "bootstrap/dist/css/bootstrap.min.css"

import "./index.css"

import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
