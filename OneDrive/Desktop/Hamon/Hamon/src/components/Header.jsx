import { CiShoppingCart } from "react-icons/ci";
import { IconContext } from "react-icons";
function Header() {
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
                    <div className="badge">0</div>
                </div>

            </div>
        </div>
    )
}

export default Header