import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import ThemeProvider from './theme';
import Layout from 'shared/components/Layout';
import Notification from 'shared/components/Notification';

// Rutas
import Dashboard from 'Dashboard';
import ordersRoutes from 'Orders/routes';
import productsRoutes from 'Products/routes';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Dashboard /> },
            ordersRoutes,
            productsRoutes
        ]
    }
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
