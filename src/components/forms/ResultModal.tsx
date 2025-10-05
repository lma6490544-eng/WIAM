// Модальное окно для отображения результата заявки
// Включает обработку клавиатурных событий и accessibility
import React, { type FC } from "react"

import type { Personal, LoanParams } from "../../types"

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  personal: Personal
  loan: LoanParams
}

const ResultModal: FC<ResultModalProps> = ({
  isOpen,
  onClose,
  personal,
  loan,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose()
    }
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop show" />
      <div
        className="modal show d-block"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby="resultModalLabel"
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resultModalLabel">
                Заявка одобрена!
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Закрыть"
                onClick={onClose}
                tabIndex={0}
              />
            </div>
            <div className="modal-body">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Поздравляем!</h4>
                <p className="mb-0">
                  <strong>
                    {personal.lastName} {personal.firstName}
                  </strong>
                  . Вам одобрена <strong>${loan.amount}</strong> на{" "}
                  <strong>{loan.term}</strong> дней.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
                tabIndex={0}
              >
                Отлично!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultModal
