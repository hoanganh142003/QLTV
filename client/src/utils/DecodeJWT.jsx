import { jwtDecode } from 'jwt-decode';
import cookie from 'js-cookie';

const decodeToken = () => {
    const token = cookie.get('token');
    
    if (!token) {
        console.error("❌ No token found in cookies");
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("❌ Error decoding token:", error.message);
        return null;
    }
};

export default decodeToken;
