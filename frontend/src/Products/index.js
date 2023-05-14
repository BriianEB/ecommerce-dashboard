import { Routes, Route } from 'react-router-dom';

import ViewProducts from './ViewProducts';
import CreateProduct from './CreateProduct';


function Products() {
    return (
        <Routes>
            <Route index element={<ViewProducts />} />
            <Route path="create" element={<CreateProduct />} />
        </Routes>
    );
}

export default Products;