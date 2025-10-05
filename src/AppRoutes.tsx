// Конфигурация маршрутов приложения
// Использует React Router для навигации между шагами
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Step1 from "./pages/Step1"
import Step2 from "./pages/Step2"
import Step3 from "./pages/Step3"
import NotFound from "./pages/NotFound"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/step1" replace />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
