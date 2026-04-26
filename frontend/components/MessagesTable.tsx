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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface Message {
  id: number
  message: string
}

interface MessagesTableProps {
  messages: Message[]
  onEdit?: (id: number, newMessage: string) => void
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
  const [editedContent, setEditedContent] = React.useState("")
  const [editError, setEditError] = React.useState<string | null>(null)

  const handleEditClick = (message: Message) => {
    setSelectedMessage(message)
    setEditedContent(message.message)
    setEditError(null)
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (message: Message) => {
    setSelectedMessage(message)
    setDeleteDialogOpen(true)
  }

  const handleEditSubmit = () => {
    if (!editedContent.trim()) {
      setEditError("Wiadomość nie może być pusta")
      return
    }

    if (editedContent.trim().length < 3) {
      setEditError("Wiadomość musi mieć co najmniej 3 znaki")
      return
    }

    if (selectedMessage) {
      onEdit?.(selectedMessage.id, editedContent.trim())
      setEditDialogOpen(false)
      setSelectedMessage(null)
      setEditedContent("")
      setEditError(null)
    }
  }

  const handleDeleteConfirm = () => {
    if (selectedMessage) {
      onDelete?.(selectedMessage.id)
      setDeleteDialogOpen(false)
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
              <TableCell>{msg.message}</TableCell>
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

      {/* Dialog edycji */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj wiadomość</DialogTitle>
            <DialogDescription>
              Zmień treść wiadomości i kliknij Zapisz.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="edit-message">Treść wiadomości</Label>
            <Textarea
              id="edit-message"
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value)
                if (editError) setEditError(null)
              }}
              className={editError ? "border-destructive" : ""}
              rows={4}
            />
            {editError && (
              <p className="text-sm text-destructive">{editError}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isUpdating}>
              Anuluj
            </Button>
            <Button onClick={handleEditSubmit} disabled={isUpdating}>
              {isUpdating ? "Zapisywanie..." : "Zapisz"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert dialog usuwania */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta akcja jest nieodwracalna. Wiadomość zostanie trwale usunięta z bazy danych.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Usuwanie..." : "Usuń"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

