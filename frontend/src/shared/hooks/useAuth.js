import { useSelector } from 'react-redux';


function useAuth() {
    const session = useSelector((state) => state.auth);

    return session;
}

export default useAuth;