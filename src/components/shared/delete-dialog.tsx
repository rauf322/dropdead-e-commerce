'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'

export default function DeleteDialog({
  id,
  action
}: {
  id: string
  action: (id: string) => Promise<{ success: boolean; message: string }>
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  function handleDelete() {
    startTransition(async () => {
      const res = await action(id)
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    })
  }
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          className='ml-2'
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
