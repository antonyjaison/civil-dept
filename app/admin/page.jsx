import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  redirect('/admin/Facilities')

  return (
    <div>page</div>
  )
}

export default page