import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import 'vite/modulepreload-polyfill'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App/>
        );
