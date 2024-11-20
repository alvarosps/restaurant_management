import React from 'react';
import './App.scss';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Header from '~components/Header';
import TableHandler from './components/TableHandler';

const App: React.FC = () => (
    <BrowserRouter>
        <Header />
        <TableHandler />
        <AppRoutes />
    </BrowserRouter>
)

export default App;
