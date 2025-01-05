import { baseApi } from "../../api/baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    mee: builder.mutation({
      query: (userInfo) => ({
        url: "/user/me", // Adjust this URL based on your server's endpoint
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
      // Ensure this matches with your caching strategy
    }),
    me: builder.query({
      query: () => ({
        url: `/user/me`, // Backend endpoint to get a shop by ID
        method: "GET",
      }),
      providesTags: ["User"],
     
    }),
  }),

});

export const {useMeQuery,useMeeMutation} = UserApi;
