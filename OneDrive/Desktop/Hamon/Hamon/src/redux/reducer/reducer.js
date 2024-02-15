import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu_categories: [],
    menu_list: [],
    cart: [],
    selected_category: ''
}
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
})

export const { addToCart, removeCart, addMenus, addMenuCategory, updateCategory } = menuSlice.actions
export default menuSlice.reducer;