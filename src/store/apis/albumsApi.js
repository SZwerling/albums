import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// FOR DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //REMOVE LATER
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    console.log(album)
                    return [{ type: 'Album', id: album.userId}]
                },
               query: (album) => {
                return {
                    url: `/albums/${album.id}`,
                    method: 'DELETE'
                };
               },
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return [{ type: 'Album', id: arg.id }]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({   //now we get access to a hook called albumsApi.useFetchAlbumsQuery()
                providesTags: (result, error, arg) => {  // arg is whatever got passed to hook
                    return [{ type: 'Album', id: arg.id }]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET',
                    }
                }
            })
        }
    }
})

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi }