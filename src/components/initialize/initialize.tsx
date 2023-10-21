import React from 'react'
import initializing from './Initializing.webp'

const Initialize = () => {
  return (
        <div className={'w-screen h-screen flex justify-center items-center'}>
            <img className={'rounded-xl'} src={initializing} alt="initializing.."/>
        </div>
  )
}

export default Initialize
