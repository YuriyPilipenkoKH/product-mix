import React from 'react'

interface FormHeaderProps {
  titleLabel: string;
  welcomeMsg: string
}


const FormHeader = ({titleLabel, welcomeMsg}: FormHeaderProps) => {
  return (
    <div className='w-full flex flex-col space-y-1 items-center justify-center'>
      <h2 className='text-xl font-semibold '>
      {titleLabel}
      </h2>
      <p className='text-sm bg-green-200'>
        {welcomeMsg}</p>
    </div>
  )
}

export default FormHeader