import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css';
import { AuthProvider } from './context/AuthContext';

const root = document.getElementById('root');

if (root) {
    const container = createRoot(root);
    container.render(
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
