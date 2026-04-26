"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { validateMessage } from "@/lib/validation"

interface MessageFormProps {
  onSubmit?: (message: string) => void
  isSubmitting?: boolean
}

export function MessageForm({ onSubmit, isSubmitting = false }: MessageFormProps) {
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateMessage(message)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    onSubmit?.(message.trim())
    setMessage("")
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (error) setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Treść wiadomości</Label>
        <Textarea
          id="message"
          placeholder="Wpisz swoją wiadomość..."
          value={message}
          onChange={handleMessageChange}
          className={error ? "border-destructive" : ""}
          rows={4}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Dodawanie..." : "Dodaj wiadomość"}
      </Button>
    </form>
  )
}
