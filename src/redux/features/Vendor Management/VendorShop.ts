import { baseApi } from "../../api/baseApi";

const VendorShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a shop
    createShop: builder.mutation({
      query: (formData) => ({
        url: "/shop/createShop", // Ensure this URL matches your backend endpoint
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MyShop"], // Invalidate relevant cache on success
    }),

    // Query to fetch a user's shop by ID
    getMyShop: builder.query({
      query: (id) => ({
        url: `/shop/getMyShop/${id}`, // Backend endpoint to get a shop by ID
        method: "GET",
      }),
      providesTags: ["MyShop"], // Tag for caching this response
    }),
  }),
});

export const { useCreateShopMutation, useGetMyShopQuery } = VendorShopApi;
