import { baseApi } from "../../api/baseApi";



const VendorShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (formData) => ({
        url: "/shop/createShop", // Ensure this URL matches your backend endpoint
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Create Shop"],
    }),
  }),
});

export const { useCreateShopMutation } = VendorShopApi;
