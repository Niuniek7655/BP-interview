"use client";

import { MessageForm } from "@/components/MessageForm";
import { MessagesTable } from "@/components/MessagesTable";
import {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} from "@/lib/api";

export default function Home() {
  const { data: messages = [], isLoading, error } = useGetMessagesQuery();
  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation();
  const [updateMessage, { isLoading: isUpdating }] = useUpdateMessageMutation();
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

  const handleAddMessage = async (content: string) => {
    try {
      await createMessage({ content }).unwrap();
    } catch (err) {
      console.error("Błąd podczas dodawania wiadomości:", err);
    }
  };

  const handleEditMessage = async (id: number, content: string) => {
    try {
      await updateMessage({ id, content }).unwrap();
    } catch (err) {
      console.error("Błąd podczas edycji wiadomości:", err);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await deleteMessage(id).unwrap();
    } catch (err) {
      console.error("Błąd podczas usuwania wiadomości:", err);
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">Aplikacja Wiadomości</h1>

        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Dodaj nową wiadomość</h2>
          <MessageForm onSubmit={handleAddMessage} isSubmitting={isCreating} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Lista wiadomości</h2>
          {error && (
            <div className="p-4 text-red-500 bg-red-50 rounded-lg">
              Wystąpił błąd podczas ładowania wiadomości
            </div>
          )}
          <MessagesTable 
            messages={messages.map(m => ({ id: m.id, message: m.content }))}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
            isLoading={isLoading}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        </section>
      </main>
    </div>
  );
}
