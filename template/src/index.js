import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ErrorBoundary  } from "react-error-boundary"
import errImg from './error.png'

function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role="alert">
        <div style={{ width: '100%', minHeight: '100vh', color: "yellow", padding: "20px", fontWeight: 400, fontSize: '1.5rem', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
          <p>{error.message}</p>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', color: "orangered", padding: "20px", lineHeight: '1.3' }}>{error.stack}</pre>
          <img src={errImg} alt="error-img" style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: '.5', width: '500px', height: '300px'}} />
        </div>
      </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ErrorBoundary fallbackRender={fallbackRender}><App/></ErrorBoundary>)

