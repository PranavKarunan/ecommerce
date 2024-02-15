import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeCart } from '../redux/reducer/reducer';


function MenuCard({ menu }) {
    const [cart, setCart] = useState(null)
    const data = useSelector(state => state.menu)
    const dispatch = useDispatch();
    useEffect(() => {
        setCart(data?.cart)
    }, [data])

    function handleAdd(product) {
        const { dish_id, dish_name } = product;
        const isExist = cart?.find(item => item?.dish_id === dish_id);
        if (isExist) {
            const carts = cart.filter(item => item?.dish_id !== dish_id);
            setCart([...carts, { dish_id, dish_name, count: isExist.count + 1 }])

        } else {
            const newCart = [...cart]
            newCart.push({ dish_id, dish_name, count: 1 })
            setCart(newCart)
        }
        dispatch(addToCart(product))

    }
    function handleRemove(product) {
        const { dish_id, dish_name } = product;
        const isExist = cart?.find(item => item?.dish_id === dish_id);
        const carts = cart.filter(item => item?.dish_id !== dish_id);
        if (isExist) {
            if (isExist?.count === 0) {
                setCart(carts)
            }

            setCart([...carts, { dish_id, dish_name, count: isExist.count - 1 }])

        }
        dispatch(removeCart(product))
    }



    function count(item) {
        const count = cart?.find(prod => prod?.dish_id === item?.dish_id)?.count
        return count <= 0 ? 0 : count;
    }
    return (
        <>
            {
                menu?.map((item, index) => (
                    <div key={item?.dish_id} className='card'>
                        <div className='card-details'>
                            <div className='card-title'>
                                {index % 2 === 0 ? <img src="\images\veg-grn.svg" alt="" /> : <img src="\images\veg-red.svg" alt="" />}
                                <span className='txt-1'>{item?.dish_name}</span>
                            </div>
                            <span className='txt-2'>{item?.dish_currency} {item?.dish_price}</span>
                            <span className='txt-3'>{item?.dish_description}</span>
                            {item?.dish_Availability ? <button>
                                <div className='icn'>
                                    <li onClick={() => handleRemove(item)}>-</li>
                                    <li>{count(item) || 0}</li>
                                    <li onClick={() => handleAdd(item)}>+</li>
                                </div>
                            </button> : <span className='txt-4'>Not Available</span>}

                            {item?.addonCat?.length !== 0 && <span className='txt-4'>Customization available</span>}
                            {/* </div> */}
                        </div>
                        <div className='card-image'>
                            <li>{item?.dish_calories} calories</li>
                            <div className='card-img'>
                                <img className='card-image2' src={item?.dish_image} alt="" />
                            </div>
                        </div>
                    </div >
                ))
            }
        </>
    );
}

export default MenuCard;