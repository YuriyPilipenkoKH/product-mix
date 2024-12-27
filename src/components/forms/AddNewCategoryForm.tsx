import { addNewCategorySchema, addNewCategorySchemaType } from '@/models/addCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AddNewCategoryFormProps {
	creator: string
}

export const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
    const [logError, setLogError] = useState<string>('')
    const {
			register, 
			handleSubmit,
			formState,
			reset,
		} = useForm<addNewCategorySchemaType>({
			defaultValues: {
				name: '',

			},
				mode:'all',
				resolver: zodResolver(addNewCategorySchema),
		})
    const {
			errors,
			isDirty,
			isValid ,
			isSubmitting,
		} = formState
    const onSubmit = async (data: addNewCategorySchemaType) => {
      const formData = new FormData();
			formData.append('name', data.name);
			formData.append('creator', creator);
      try {
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
        setLogError(errorMessage)
      }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
				hidden
				id='creator'
				name='creator'
				defaultValue={creator}
				/>
			<input 
			 {...register('name')}
				 placeholder=	{( isSubmitting ) 
				? "Process" 
				: 'category name'}
			/>
			<button
			type='submit'
			disabled={isSubmitting || !isDirty || !isValid}
						>
				Add
			</button>
    </form>
  )
}

export default AddNewCategoryForm
