"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { validateMessage } from "@/lib/validation"
import type { Message } from "@/lib/api"

interface EditMessageDialogProps {
  message: Message | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: number, content: string) => void
  isUpdating?: boolean
}

export function EditMessageDialog({
  message,
  open,
  onOpenChange,
  onSave,
  isUpdating = false,
}: EditMessageDialogProps) {
  const [editedContent, setEditedContent] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  // Synchronizuj stan z propem message
  React.useEffect(() => {
    if (message) {
      setEditedContent(message.content)
      setError(null)
    }
  }, [message])

  const handleSubmit = () => {
    const validationError = validateMessage(editedContent)
    if (validationError) {
      setError(validationError)
      return
    }

    if (message) {
      onSave(message.id, editedContent.trim())
      onOpenChange(false)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value)
    if (error) setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onChange={handleContentChange}
            className={error ? "border-destructive" : ""}
            rows={4}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isUpdating}
          >
            Anuluj
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? "Zapisywanie..." : "Zapisz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

