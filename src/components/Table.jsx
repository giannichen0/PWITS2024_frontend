import React from 'react'

function Table({data}) {
  return (

    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>ID</th>
          <th className='border border-slate-600 rounded-md'>Nome</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Cognome
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Email
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Numero di telefono
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dottore, index) => (
          <tr key={dottore._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {dottore.name}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {dottore.surname}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {dottore.email}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {dottore.telefono}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table