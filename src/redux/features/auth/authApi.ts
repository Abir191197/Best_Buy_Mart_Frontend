import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "auth/login", // Adjust this URL based on your server's endpoint
        method: "POST",
        body: userInfo,
      }),
      // Ensure this matches with your caching strategy
    }),
  }),
  overrideExisting: false, // Ensures existing endpoints aren't overridden
});

export default authApi;
