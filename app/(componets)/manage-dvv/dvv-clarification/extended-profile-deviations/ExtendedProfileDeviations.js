import React from 'react'

const ExtendedProfileDeviations = () => {
    return (
        <div className='mt-4'>
            <table className='p-2'>
                <tr className='border border-black w-full'>
                    <td className='border border-r border-black'>Extended ID</td>
                    <td className='border border-r border-black'>Deviations of Extended Question</td>
                    <td className='border border-r border-black'>Affected Metrics</td>
                    <td className='border border-r border-black'>Findings of DVV</td>
                    <td className='border border-r border-black'>Response of HEI <span className='text-red-600'>*</span></td>
                </tr>
            </table>
        </div>
    )
}

export default ExtendedProfileDeviations