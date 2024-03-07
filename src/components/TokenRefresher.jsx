import React, { useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/authProvider";

axios.defaults.withCredentials = true;
const TokenRefresher = () => {
    const { setAccessToken, accessToken } = useContext(AuthContext);

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 60000); // Refresh token every 60 seconds

        return () => clearInterval(interval);
    }, []);

    const refreshAccessToken = async () => {
        
        try {
            const response = await axios.get("http://localhost:8080/auth/refresh", {
                withCredentials: true, // Send cookies with the request
            });
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken + "\t" + response.data.role);
           
        } catch (error) {
            console.error("Error refreshing access token:", error);
            
            
        }
    };

    return null; 
};

export default TokenRefresher;
