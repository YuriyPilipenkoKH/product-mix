import React, { useState } from 'react'

interface AddNewCategoryFormProps {
	creator: string
}

export const AddNewCategoryForm: React.FC<AddNewCategoryFormProps> = ({
	creator
	}) => {
    const [logError, setLogError] = useState<string>('')
  return (
    <div>AddNewCategoryForm</div>
  )
}

export default AddNewCategoryForm
