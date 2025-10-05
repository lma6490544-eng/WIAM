import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="h4 mb-4">Страница не найдена</h2>
        <p className="text-muted mb-4">
          К сожалению, запрашиваемая страница не существует.
        </p>
        <Link to="/step1" className="btn btn-primary btn-lg">
          Вернуться к началу
        </Link>
      </div>
    </div>
  )
}

export default NotFound
