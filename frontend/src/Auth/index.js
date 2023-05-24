import { Routes, Route } from 'react-router-dom';
import NotFound from 'shared/components/Errors/NotFound';

import Login from './Login';


function Auth() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Auth;