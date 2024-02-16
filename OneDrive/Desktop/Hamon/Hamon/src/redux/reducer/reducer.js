import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    menu_categories: [],
    menu_list: [],
    cart: [],
    selected_category: '',
    // status: "idle",
    // error: null,
}

// export const fetchData = createAsyncThunk("menu/fetchData", async () => {
//     try {
//         const response = await axios.get("https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89");
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

const menuSlice = createSlice({
    name: 'Menu',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { dish_id, dish_name } = action.payload;
            const existingItem = state.cart.find(item => item.dish_id === dish_id);
            if (existingItem) {
                const carts = state.cart.filter(item => item?.dish_id !== dish_id);
                state.cart = [...carts, { dish_id, dish_name, count: existingItem.count + 1 }]
            } else {
                state.cart.push({ dish_id, dish_name, count: 1 });
            }
        },
        removeCart: (state, action) => {
            const { dish_id, dish_name } = action.payload;
            const isExist = state.cart.find(item => item.dish_id === dish_id);
            if (isExist) {
                if (isExist?.count === 1) {
                    state.cart = state.cart.filter(item => item?.dish_id !== dish_id)
                } else {
                    const carts = state.cart.filter(item => item?.dish_id !== dish_id);
                    state.cart = [...carts, { dish_id, dish_name, count: isExist.count - 1 }]
                }


            }
        },
        addMenus: (state, action) => {
            state.menu_list = action.payload;
        },
        addMenuCategory: (state, action) => {
            state.menu_categories = action.payload;
        },
        updateCategory: (state, action) => {
            state.menu_list = action.payload.category_dishes
            state.selected_category = action.payload.dish_id;
        }
    }
    // ,
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchData.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(fetchData.fulfilled, (state, action) => {
    //             state.status = "succeeded";
    //             state.menu_list = action.payload;
    //         })
    //         .addCase(fetchData.rejected, (state, action) => {
    //             state.status = "failed";
    //             state.error = action.error.message;
    //         });
    // },
})

export const { addToCart, removeCart, addMenus, addMenuCategory, updateCategory } = menuSlice.actions
export default menuSlice.reducer;