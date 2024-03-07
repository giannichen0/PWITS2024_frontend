import React, { useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/authProvider";
import { useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;
const TokenRefresher = () => {
    const location = useLocation()
    const { setAccessToken, accessToken } = useContext(AuthContext);

    useEffect(() => {
        const interval = setInterval(() => {
            
            if(location.pathname !== "/"){
                refreshAccessToken();
                
            }
        }, 6000); // Refresh token every 60 seconds

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
