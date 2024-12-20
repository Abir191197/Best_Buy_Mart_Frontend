import { baseApi } from "../../api/baseApi";

const VendorProductCreateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a shop
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/createProduct", // Ensure this URL matches your backend endpoint
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Create Shop"], // Invalidate relevant cache on success
    }),

    // Query to fetch a user's shop by ID
    getMyShop: builder.query({
      query: (id) => ({
        url: `/shop/getMyShop/${id}`, // Backend endpoint to get a shop by ID
        method: "GET",
      }),
      providesTags: [], // Tag for caching this response
    }),
  }),
});

export const { useCreateProductMutation, useGetMyShopQuery } = VendorProductCreateApi;
