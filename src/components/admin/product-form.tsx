'use client'

import type { Product } from '@/types/product.type'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type ControllerRenderProps, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { UploadButton } from '@/lib/uploadthing'
import { useValidatorForm } from '@/lib/validatorForm'
import { insertProductSchema } from '@/lib/validators'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export default function ProductForm({
  type,
  product,
  productId
}: {
  type: 'Create' | 'Update'
  product?: Product
  productId?: string
}) {
  const router = useRouter()

  const { createForm, updateForm, createSlug } = useValidatorForm(product)

  const form = (type === 'Create' ? createForm : updateForm) as typeof createForm

  async function onSubmit(values: z.infer<typeof insertProductSchema>) {
    if (type === 'Create') {
      const res = await createProduct(values)
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      router.push('/admin/products')
    }

    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products')
        return
      }
      const res = await updateProduct({ id: productId, ...values })
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      router.push('/admin/products')
    }
  }

  const images = form.watch('images')

  return (
    <Form {...form}>
      <form
        method='POST'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-5'
      >
        <div className='flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter product name'
                    {...field}
                  />
                </FormControl>
                <div className='h-[36px] mt-2' />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter product slug'
                    {...field}
                  />
                </FormControl>
                <Button
                  type='button'
                  className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                  onClick={() => {
                    form.setValue('slug', createSlug(form.getValues('name')))
                  }}
                >
                  Generate
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='category'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter category'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='brand'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter brand'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='price'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter price'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter stock'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field flex flex-col md:flex-row gap-5'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='div flex-start space-x-2'>
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt='product image'
                          className='w-20 h-20 object-cover object-center rounded-sm'
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`Failed to upload image: ${error.message}`)
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field'></div>
        <div>
          <FormField
            control={form.control}
            name='description'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div></div>
        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting
            ? 'Submitting...'
            : type === 'Create'
              ? 'Create Product'
              : 'Update Product'}
        </Button>
      </form>
    </Form>
  )
}
