import React from 'react'
import PageContainer from './Common/PageContainer'
import { FaFaceSadCry } from 'react-icons/fa6'

const NotFound = () => {
  return (
        <PageContainer centerContent>
            <div className={'flex items-center'}>
                <span><FaFaceSadCry size={30}/></span>
                <span className={'ml-2 text-xl'}>Not found</span>
            </div>
        </PageContainer>
  )
}

export default NotFound
