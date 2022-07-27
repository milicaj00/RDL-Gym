import { createContext, useEffect, useReducer, useMemo } from "react";
import UserReducer from "./UserReducer";
import useAxiosPrivate from '../api/useAxiosPrivate'
import { LoginSuccess, LoginStart, LoginFailure } from "./UserActions";
import { useCookies } from "react-cookie";

const defaultValue = {
    // user: JSON.parse(localStorage.getItem("user")) || null,
    user: null,
    ucitavaSe: true,
    error: null,
};
const UserContext = createContext(defaultValue);

const UserContextProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate()
    const [state, dispatch] = useReducer(UserReducer, defaultValue);


    useEffect(() => {
        let userId = localStorage.getItem("userId")
        let token = localStorage.getItem("token")

        const getUser = async () => {
            try {
                const res = await axiosPrivate.get('http://localhost:8800/api/auth/vratiKorisnikaPrekoTokena?userId=' + localStorage.getItem('userId'))
                // console.log(res)
                if (res.data) {
                    dispatch(LoginSuccess(res.data))
                    localStorage.setItem('token', res.data.token)
                    document.cookie = 'token=' + res.data.refreshToken
                }
            }
            catch (err) {
                console.log(err)
                localStorage.clear()
                document.cookie = 'token=' + ''
                dispatch(LoginFailure())
            }
        }

        if (token && token.length && userId) {
            dispatch(LoginStart())
            getUser()
        } else {
            dispatch(LoginFailure())
            document.cookie = 'token=' + ''
        }

    }, [])


    return (
        <UserContext.Provider
            value=
            {{
                user: state.user,
                ucitavaSe: state.ucitavaSe,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider, UserContext }