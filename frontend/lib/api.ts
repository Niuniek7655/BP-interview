import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message {
  id: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMessageRequest {
  content: string;
}

export interface UpdateMessageRequest {
  id: number;
  content: string;
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    // Pobieranie wszystkich wiadomości
    getMessages: builder.query<Message[], void>({
      query: () => '/messages',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Messages' as const, id })),
              { type: 'Messages', id: 'LIST' },
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),

    // Pobieranie pojedynczej wiadomości
    getMessage: builder.query<Message, number>({
      query: (id) => `/messages/${id}`,
      providesTags: (result, error, id) => [{ type: 'Messages', id }],
    }),

    // Dodawanie nowej wiadomości
    createMessage: builder.mutation<Message, CreateMessageRequest>({
      query: (body) => ({
        url: '/messages',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),

    // Aktualizacja wiadomości
    updateMessage: builder.mutation<Message, UpdateMessageRequest>({
      query: ({ id, content }) => ({
        url: `/messages/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Messages', id },
        { type: 'Messages', id: 'LIST' },
      ],
    }),

    // Usuwanie wiadomości
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Messages', id },
        { type: 'Messages', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;

