import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { selectToken } from "../features/User/UserSlice";
import useRefreshToken from '../hooks/useRefreshToken'
import CustomBackdrop from "../styles/CustomBackdrop";

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const persist = localStorage.getItem('persist')

    const accessToken = useSelector(selectToken);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();

            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false);

            }
        };

        if (!accessToken && persist) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }


    }, [persist, refresh, accessToken]);



    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : !isLoading
                        ? <Outlet />
                        : <CustomBackdrop />
            }

        </>
    );
};

export default PersistLogin;
