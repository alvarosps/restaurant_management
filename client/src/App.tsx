import React from 'react';
import './App.scss';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Header from '~components/Header';

const App: React.FC = () => (
    <BrowserRouter>
        <Header />
        <AppRoutes />
    </BrowserRouter>
)

export default App;
