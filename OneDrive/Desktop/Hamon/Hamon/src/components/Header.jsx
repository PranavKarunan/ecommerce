import { CiShoppingCart } from "react-icons/ci";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Header() {
    const [cart, setCart] = useState(0);
    const data = useSelector(state => state.menu)
    useEffect(() => {
        setCart(data?.cart?.length)
    }, [data])
    return (
        <div className='header'>
            <div>Artisan Resto Cafe</div>
            <div className="order-part">
                <span>My Orders</span>
                <div className="cart">
                    <div >
                        <IconContext.Provider value={{ color: 'white', className: 'cart-icon', size: '1.4em' }} >
                            <CiShoppingCart />
                        </IconContext.Provider>
                    </div>
                    <div className="badge">{cart}</div>
                </div>

            </div>
        </div>
    )
}

export default Header