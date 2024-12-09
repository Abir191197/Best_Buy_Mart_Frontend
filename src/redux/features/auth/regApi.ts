import { baseApi } from "../../api/baseApi";

const reqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "auth/signup",
        method: "POST",
        body: userInfo,
      }),
     
    }),
  }),
  overrideExisting: false,
});

export default reqApi;
