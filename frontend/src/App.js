import { Routes, Route } from 'react-router-dom';

import ThemeProvider from './theme';

import Layout from 'shared/components/Layout';
//import ProgressBar from 'shared/components/ProgressBar';
import Notification from 'shared/components/Notification';

// Rutas
import Dashboard from 'dashboard/Dashboard';
import Orders from 'Orders';
import Products from 'Products';

function App() {
    return (
        <ThemeProvider>
            {/*<ProgressBar />*/}
            <Notification />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders/*" element={<Orders />} />
                    <Route path="products/*" element={<Products />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
