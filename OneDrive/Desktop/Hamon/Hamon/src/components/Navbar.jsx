import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { updateCategory } from '../redux/reducer/reducer'
function Navbar({ category, menu, setMenu }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        setSelectedCategory(category?.[0]);
    }, [category])

    function handleChangeCategory(menu) {
        setMenu(menu?.category_dishes)
        dispatch(updateCategory(menu))
        setSelectedCategory(menu);
    }

    return (
        <div className="nav-bar">
            <span className="nav-menu">
                {
                    category?.map(item => (
                        <span key={item?.menu_category_id} className={selectedCategory?.menu_category_id == item?.menu_category_id ? "nav-item active" : 'nav-item'} onClick={() => handleChangeCategory(item)}>{item?.menu_category}</span>
                    ))
                }
            </span >
        </div >
    )
}

export default Navbar