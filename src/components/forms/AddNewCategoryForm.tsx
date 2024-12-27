import { addNewCategorySchema, addNewCategorySchemaType } from '@/models/addCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  return (
    <div>AddNewCategoryForm</div>
  )
}

export default AddNewCategoryForm
