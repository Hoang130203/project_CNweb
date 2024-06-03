import { createContext, useEffect, useState } from "react";
import UserApi from "../../Api/UserApi";

export const NumberContext = createContext();
const { Provider } = NumberContext;
export const NumberProvider = (props) => {
    const [number, setNumber] = useState(0);
    useEffect(() => {
        UserApi.GetCart().then(res => {
            setNumber(res.data.length)
        });
    }, [])
    return (
        <Provider value={[number, setNumber]}>
            {props.children}
        </Provider>
    )
}