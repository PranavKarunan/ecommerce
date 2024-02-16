import { useEffect, useState } from "react";
import MenuCard from "../components/Card";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";

function Home() {
    // const url = import.meta.env.VITE_REACT_APP_API_BASE_URL;
    const [menu, setMenu] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        getAllData(cancelTokenSource);
        return () => {
            cancelTokenSource.cancel("Request canceled by cleanup");
        };
    }, []);

    async function getAllData(cancelTokenSource) {
        try {
            const response = await axios.get('https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89', { cancelToken: cancelTokenSource.token });
            const responseData = response?.data?.data?.[0];

            if (responseData) {
                setCategory(responseData.table_menu_list);
                setMenu(responseData.table_menu_list?.[0]?.category_dishes);
            } else {
                console.error("Invalid response data");
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.error("Error fetching data:", error);
            }
        }
    }

    return (
        <div className="home-page">
            <Header />
            <Navbar category={category} menu={menu} setMenu={setMenu} />
            <MenuCard menu={menu} setMenu={setMenu} />
        </div>
    );
}

export default Home;
