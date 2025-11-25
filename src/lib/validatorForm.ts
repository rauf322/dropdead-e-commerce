import type { Product } from '@/types/product.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { productDefaultValues } from '@/lib/constants'
import { insertProductSchema, updateProductSchema } from '@/lib/validators'

export function useValidatorForm(product?: Product) {
  const createForm = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: productDefaultValues
  })

  const updateForm = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product
  })

  function createSlug(str: string): string {
    str = str.split(' ').join('-').toLowerCase()
    return str
  }

  return {
    updateForm,
    createForm,
    createSlug
  }
}
