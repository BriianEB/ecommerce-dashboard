import { Routes, Route } from 'react-router-dom';
import CustomRoute from 'shared/components/CustomRoute';

import ViewProducts from './ViewProducts';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';


function Products() {
    return (
        <Routes>
            <Route index element={<CustomRoute><ViewProducts /></CustomRoute>} />
            <Route path="create" element={<CreateProduct />} />
            <Route path=":id/edit" element={<EditProduct />} />
        </Routes>
    );
}

export default Products;