'use client'
import React, { useState } from 'react'
import AddNewCategoryForm from '../forms/AddNewCategoryForm'


const AddNewCategoryUI = () => {
  const [show, setShow] = useState(false)
  return (
    <>
    {show ? (
        <AddNewCategoryForm creator='key'/>
    ) : (
      <button>
        Add Category
      </button>
    )}
    </>
  )
}

export default AddNewCategoryUI