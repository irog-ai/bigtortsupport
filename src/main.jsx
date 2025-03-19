import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import ErrorBoundary from './components/ErrorBoundary.jsx';
Amplify.configure(config);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </StrictMode>,
)
