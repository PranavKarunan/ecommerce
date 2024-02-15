import { useEffect, useState } from "react"
import MenuCard from "../components/Card"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import axios from "axios";

function Home() {
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState([])
    useEffect(() => {
        getAllData()
    }, [])
    async function getAllData() {
        const data = await axios.get('https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89');
        setCategory(data?.data?.data?.[0]?.table_menu_list)
        setMenu(data?.data?.data?.[0]?.table_menu_list?.[0]?.category_dishes)
    }



    return (
        <div className="home-page">
            <Header />
            <Navbar category={category} menu={menu} setMenu={setMenu} />
            <MenuCard menu={menu} setMenu={setMenu} />
        </div>
    )
}

export default Home