// Layout компонент для всех шагов формы
// Обеспечивает единообразное оформление и структуру
import React, { type FC } from "react"

interface StepLayoutProps {
  title: string
  children: React.ReactNode
}

const StepLayout: FC<StepLayoutProps> = ({ title, children }) => (
  <div className="card">
    <div className="card-header">
      <h2 className="card-title text-center mb-0">{title}</h2>
    </div>
    <div className="card-body">{children}</div>
  </div>
)

export default StepLayout
