import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/' }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: () => 'goods'
    })
  })
})

export const { useGetGoodsQuery } = authApi
