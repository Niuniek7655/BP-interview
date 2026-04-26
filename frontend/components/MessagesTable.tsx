"use client"

import * as React from "react"
import { Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EditMessageDialog } from "@/components/EditMessageDialog"
import { DeleteMessageDialog } from "@/components/DeleteMessageDialog"
import type { Message } from "@/lib/api"

interface MessagesTableProps {
  messages: Message[]
  onEdit?: (id: number, newContent: string) => void
  onDelete?: (id: number) => void
  isLoading?: boolean
  isUpdating?: boolean
  isDeleting?: boolean
}

export function MessagesTable({
  messages,
  onEdit,
  onDelete,
  isLoading = false,
  isUpdating = false,
  isDeleting = false,
}: MessagesTableProps) {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null)

  const handleEditClick = (message: Message) => {
    setSelectedMessage(message)
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (message: Message) => {
    setSelectedMessage(message)
    setDeleteDialogOpen(true)
  }

  const handleEditSave = (id: number, content: string) => {
    onEdit?.(id, content)
    setSelectedMessage(null)
  }

  const handleDeleteConfirm = () => {
    if (selectedMessage) {
      onDelete?.(selectedMessage.id)
      setSelectedMessage(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Ładowanie wiadomości...</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg">
        <p className="text-muted-foreground">Brak wiadomości do wyświetlenia</p>
      </div>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Wiadomość</TableHead>
            <TableHead className="w-[120px] text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id}>
              <TableCell className="font-medium">{msg.id}</TableCell>
              <TableCell>{msg.content}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => handleEditClick(msg)}
                    aria-label="Edytuj wiadomość"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => handleDeleteClick(msg)}
                    aria-label="Usuń wiadomość"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditMessageDialog
        message={selectedMessage}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleEditSave}
        isUpdating={isUpdating}
      />

      <DeleteMessageDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  )
}
