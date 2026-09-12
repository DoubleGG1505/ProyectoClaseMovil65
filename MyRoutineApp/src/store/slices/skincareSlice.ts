import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductReview } from "../../utils/types/Skincare";

type SkincareState = { products: Product[] };

const initialState: SkincareState = {
    products: [],
};

export const skincareSlice = createSlice({
    name: "skincare",
    initialState,
    reducers: {

        addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
            const newProduct: Product = {
                ...action.payload,
                id: Date.now().toString(),
            };
            state.products.push(newProduct);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product.id !== action.payload
            );
        },
        addReview: (state, action: PayloadAction<{ productId: string; review: ProductReview }>) => {
            const product = state.products.find((p) => p.id === action.payload.productId);
            if (product) {
                product.review = action.payload.review;
            }
        }
    }
});

export const {
    addProduct,
    deleteProduct,
    addReview
} = skincareSlice.actions;

export default skincareSlice.reducer;