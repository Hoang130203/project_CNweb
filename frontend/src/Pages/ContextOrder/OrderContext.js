import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

const { Provider } = OrderContext;

export const OrderProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState(
        JSON.parse(localStorage.getItem('w15store_user'))?.address || 'll'
    );
    useEffect(() => {
    }, [products]);
    return (
        <Provider value={[products, setProducts, address, setAddress]}>
            {props.children}
        </Provider>
    )
}