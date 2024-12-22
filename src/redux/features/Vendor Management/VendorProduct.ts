import { baseApi } from "../../api/baseApi";

const VendorProductCreateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to create a product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/createProduct", // Ensure this URL matches your backend endpoint
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MyShop", "Products"], // Invalidate cache on success
    }),

    // Query to fetch a user's shop by ID
    getMyShop: builder.query({
      query: (id) => ({
        url: `/shop/getMyShop/${id}`, // Backend endpoint to get a shop by ID
        method: "GET",
      }),
      providesTags: ["MyShop"], // Cache tag for shop
    }),

    // Query to fetch all products with a search term and sorting
    getAllProductWithSearch: builder.query({
      query: ({ searchTerm = "", skip = 0, limit = 12, sort = "newest" }) => {
        const sortCriteria =
          sort === "price_asc"
            ? { price: "asc" }
            : sort === "price_desc"
            ? { price: "desc" }
            : { createdAt: "desc" };

        return {
          url: `/product/allProducts/`,
          method: "GET",
          params: {
            searchTerm,
            skip,
            limit,
            sort: JSON.stringify(sortCriteria),
          },
        };
      },
      providesTags: ["Products"], // For automatic cache updates
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/getProduct/${id}`, // Backend endpoint to get a single product by ID
        method: "GET",
      }),
    }),

    //duplicate the product
    duplicateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/duplicateProduct/${id}`, // Backend endpoint to duplicate a product by ID
        method: "POST",
        body: formData, // Sending formData as the request body
      }),
      invalidatesTags: ["Products"], // Invalidate cache on success to refresh the product list
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetMyShopQuery,
  useGetAllProductWithSearchQuery,
  useGetSingleProductQuery,
  useDuplicateProductMutation,
} = VendorProductCreateApi;
