import React, { useState } from 'react'
import authStore from '../../mobx/auth'
import { Navigate } from 'react-router-dom'
import { profileRoute } from '../../common/common'
import Auth from './Auth'

interface authContainerProps {
  smallScreenMode: boolean
  isLogged: boolean
  currentUserId: number
}

const AuthContainer: React.FC<authContainerProps> = ({ smallScreenMode, isLogged, currentUserId }) => {
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  // Auth related states
  const authError: string = authStore.authErrorText
  const isAuthError: boolean = authError !== ''
  const isCaptchaRequired = authStore.isCaptchaRequired
  const captchaUrl: string = authStore.captchaUrl

  // Handle submit login form
  const onFinish = (values: any) => {
    setIsFormDisabled(true)
    authStore.signIn(values.email, values.password, values.remember, values.captcha)
      .finally(() => {
        setIsFormDisabled(false)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // If user authorized - redirect to his profile
  if (isLogged) {
    return <Navigate to={`${profileRoute}/${currentUserId}`}/>
  }

  return (
        <Auth
            smallScreenMode={smallScreenMode}
            isAuthError={isAuthError}
            isCaptchaRequired={isCaptchaRequired}
            isFormDisabled={isFormDisabled}
            authError={authError}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            captchaUrl={captchaUrl}/>
  )
}


export default AuthContainer
