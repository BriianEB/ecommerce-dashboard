import { Routes, Route } from 'react-router-dom';

import ThemeProvider from './theme';

import Layout from 'shared/components/Layout';
import Dashboard from 'dashboard/Dashboard';
import Orders from 'Orders';


function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders/*" element={<Orders />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
