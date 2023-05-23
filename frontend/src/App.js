import { Routes, Route} from 'react-router-dom';

import ThemeProvider from './theme';
import Layout from 'shared/components/Layout';

import Notification from 'shared/components/Notification';

// Rutas
import Auth from 'Auth';
import Dashboard from 'Dashboard';
import Orders from 'Orders';
import Products from 'Products';


function App() {
    return (
        <ThemeProvider>            
            <Notification />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders/*" element={<Orders />} />
                    <Route path="products/*" element={<Products />} />
                </Route>
                <Route path="/auth/*" element={<Auth />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
