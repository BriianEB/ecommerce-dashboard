import i18n from 'i18next';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import ThemeProvider from './theme';
import Layout from 'shared/components/Layout';
import Notification from 'shared/components/Notification';

// Rutas
import authRoutes from 'Auth/routes';
import Dashboard from 'Dashboard';
import ordersRoutes from 'Orders/routes';
import productsRoutes from 'Products/routes';
import Error from 'shared/components/Error';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            ordersRoutes,
            productsRoutes
        ],
        handle: {crumb: () => ({
            name: i18n.t('dashboard.label'),
            path: '/'
        })}
    },
    authRoutes
]);

function App() {
    return (
        <ThemeProvider>            
            <Notification />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
