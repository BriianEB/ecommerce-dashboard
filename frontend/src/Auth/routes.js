import Layout from './Layout';
import Login from './Login';

import { action as loginAction } from './Login';


const routes = {
    path: '/auth',
    element: <Layout />,
    children: [
        {
            path: 'login',
            element: <Login />,
            action: loginAction
        }
    ]
};

export default routes;