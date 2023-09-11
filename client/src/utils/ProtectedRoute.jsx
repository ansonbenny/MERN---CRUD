import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setHeader } from "../redux/additional";
import { fetchUser } from "../redux/user";

const ProtectedRoute = ({ isAuth }) => {
    const [component, setComponent] = useState(null); // for show component / page

    const location = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useLayoutEffect(() => {

        const abortControl = new AbortController();

        (async () => {
            let res = await dispatch(fetchUser(abortControl?.signal));

            if (res?.payload) {
                // res?.payload is the user details
                if (isAuth) {
                    dispatch(setHeader(true));
                    setComponent(<Outlet context={{ location, user: res?.payload }} />);
                } else {
                    dispatch(setHeader(false));
                    navigate("/");
                }
            } else if (res?.error && res?.error?.code !== "ERR_CANCELED") {
                dispatch(setHeader(false));

                if (isAuth) {
                    navigate("/login");
                } else if (!isAuth) {
                    setComponent(<Outlet context={{ location }} />);
                }
            }
        })();

        return () => {
            abortControl?.abort?.();
        };
    }, [location, isAuth]);

    return component;
};

export default ProtectedRoute;