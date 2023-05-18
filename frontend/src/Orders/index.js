import { Routes, Route } from 'react-router-dom';
import CustomRoute from 'shared/components/CustomRoute';

import ViewOrders from './ViewOrders';
import CreateOrder from './CreateOrder';


function Orders() {
    return (
        <Routes>
            <Route index element={<CustomRoute><ViewOrders /></CustomRoute>} />
            <Route path="create" element={<CreateOrder />} />
        </Routes>
    );
}

export default Orders;