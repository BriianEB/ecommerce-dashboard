import { Routes, Route } from 'react-router-dom';

import ViewOrders from './ViewOrders';
import CreateOrder from './CreateOrder';


function Orders() {
    return (
        <Routes>
            <Route index element={<ViewOrders />} />
            <Route path="create" element={<CreateOrder />} />
        </Routes>
    );
}

export default Orders;