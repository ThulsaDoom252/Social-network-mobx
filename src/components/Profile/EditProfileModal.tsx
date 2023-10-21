import React, { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import anon from '../../public/anon.jpg'
import { type ProfileData } from '../../types'
import { Button, Form, Input, Select } from 'antd'
import profileStore from '../../mobx/profile'
import TextArea from 'antd/es/input/TextArea'
import { contactUrlCheck, delay } from '../../common/common'
import appStore from '../../mobx/app'

interface EditProfileModalProps {
  isOpen: boolean
  currentUserProfileData: Partial<ProfileData>
  smallScreen?: boolean
  isAvatarUpdating: boolean
  isUserDataUpdating: boolean
  handleCloseModal: () => void
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  smallScreen = false,
  isAvatarUpdating,
  isUserDataUpdating,
  currentUserProfileData,
  handleCloseModal
}) => {
  // Destructuring props
  const {
    fullName,
    contacts,
    aboutMe,
    lookingForAJobDescription,
    lookingForAJob,
    userId,
    photos
  } = currentUserProfileData as ProfileData
  const {
    github, twitter,
    facebook, website,
    youtube, instagram
  } = contacts

  const { large: largePhoto } = photos

  // Ant design native hook form
  const [form] = Form.useForm()

  const [initialFormValues, setInitialFormValues] = useState<Partial<Record<string, any>>>({})

  // Setting looking for a job value - to be changeable in form
  const [lookingForAJobValue, setIsLookingForAJobValue] = useState<('Yes' | 'No') | undefined>(lookingForAJob ? 'Yes' : 'No')

  // Ref for hidden file input
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  // Contacts array for mapping in form
  const contactsArray = [
    {
      label: 'Instagram',
      url: instagram,
      contactType: 'instagram'
    },
    {
      label: 'Youtube',
      url: youtube,
      contactType: 'youtube'
    },
    {
      label: 'Github',
      url: github,
      contactType: 'github'
    },
    {
      label: 'Facebook',
      url: facebook,
      contactType: 'facebook'
    },
    {
      label: 'Twitter',
      url: twitter,
      contactType: 'twitter'
    },
    {
      label: 'Website',
      url: website,
      contactType: 'website'
    }
  ]

  // Modal styles
  const mainTitleStyle: string = 'bg-gray-200 w-full border-b border-gray-400'
  const titlesStyle: string = 'font-semibold mt-2 cursor-default'

  // Avatar change handler
  const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) {
      profileStore.updateAvatar(selectedFile).then(() => void 0)
    }
  }
  const handleAvatarClick = () => { hiddenFileInput.current && hiddenFileInput.current.click() }

  // Setting props values in form values
  form.setFieldsValue({
    fullName,
    aboutMe,
    lookingForAJob: lookingForAJobValue,
    lookingForAJobDescription,
    github,
    twitter,
    facebook,
    instagram,
    website,
    youtube
  })

  useEffect(() => {
    if (isOpen) {
      setInitialFormValues({
        fullName,
        aboutMe,
        lookingForAJob: lookingForAJob ? 'Yes' : 'No',
        lookingForAJobDescription,
        github,
        twitter,
        facebook,
        instagram,
        website,
        youtube
      })
    }
  }, [isOpen, fullName, aboutMe, lookingForAJob, lookingForAJobDescription,
    github, twitter, facebook, instagram, website, youtube])

  // Handle submit form
  const onFinish = async (values: any) => {
    const formChanged = Object.keys(values).some(key => values[key] !== initialFormValues[key])

    if (!formChanged) {
      appStore.setApiError('You have changed nothing')
      await delay(100)
      appStore.setApiError('')
      return
    }

    // Refreshing mobx state depending on form values
    await profileStore.updateUserData(
      userId.toString(),
      values.aboutMe,
      lookingForAJobValue === 'Yes',
      values.lookingForAJobDescription,
      values.fullName,
      values.github,
      values.facebook,
      values.instagram,
      values.twitter,
      values.website,
      values.youtube
    )
  }

  // Input change handler
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    form.setFieldsValue({ [fieldName]: fieldValue })
  }

  // Textarea change handler
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    form.setFieldsValue({ [fieldName]: fieldValue })
  }

  // Dropdown handler
  const handleSelectChange = (value: 'Yes' | 'No') => {
    setIsLookingForAJobValue(value)
  }

  return (
        // Enter/Exit modal animation
        <Transition
            show={isOpen}
            enter={'transition ease-out duration-300'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'transition ease-in duration-200'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
            className={'fixed inset-0 z-10 overflow-y-auto'}
        >
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-30"/>
                {/** *******************Main container */}
                <div style={{ background: 'rgb(191,191,218)' }}
                     className={` w-editModal relative ${smallScreen ? 'm-1' : 'h-fit p-4'} 
                     rounded-lg  
                     overflow-y-auto 
                     z-20 
                     relative 
                     `}
                     onClick={e => { e.stopPropagation() }}
                >
                    <div
                        onClick={handleCloseModal}
                        className={'text-gray-500 absolute top-0 right-1 cursor-pointer'}>
                        <IoClose size={18}/>
                    </div>
                    {/** Inner flex block Desktop only */}
                    <div className={`${!smallScreen && 'flex'}`}>
                        {/** ***********Profile Picture block */}
                        <div className={`
                        flex-col
                        ${!smallScreen ? 'w-1/3 mr-2' : 'w-full'}
                        `}>
                            <h4 className={`${mainTitleStyle} rounded-t-md`}>Profile Picture</h4>
                            <div className={`
                               flex
                               justify-center
                               items-center
                               rounded-b-md
                               h-60
                               bg-white
                               w-full
                               ${!smallScreen && 'p-1'}
                            `}>
                                <div className='flex flex-col items-center justify-center'>
                                    <img src={largePhoto || anon} alt="profile-picture"
                                         className='rounded-full h-24 w-24'/>
                                    <div className={`${!smallScreen && 'text-center'}`}>JPG or PNG no larger then 5 MB
                                    </div>
                                    <input ref={hiddenFileInput}
                                           hidden={true} type={'file'}
                                           onChange={updateAvatar}/>
                                    <Button disabled={isAvatarUpdating}
                                            loading={isAvatarUpdating}
                                            onClick={handleAvatarClick} type={'primary'}
                                            className="mt-4 bg-blue-500 ">
                                        {isAvatarUpdating ? 'Loading..' : 'Upload new image'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/** Info block */}
                        <div className={`
                        flex 
                        flex-col 
                        bg-white 
                        p-1 
                        pb-14
                        rounded-md 
                        relative
                        ${!smallScreen ? 'w-full h-full' : 'mt-3'}
                        `}>
                            <Form className={'w-full'} form={form} onFinish={onFinish} disabled={isUserDataUpdating}>
                                <h5 className={mainTitleStyle}>Your Personal Data</h5>
                                {/* Personal/work info flex container (desktop only) */}
                                <div className={`
                                ${!smallScreen && 'w-full flex justify-between mt-2'}
                                `}>
                                    {/* Personal info */}
                                    <div className="mb-4">
                                        <h6 className={titlesStyle}>About You</h6>
                                        <div>
                                            <label htmlFor="fullName">Username*:</label>
                                            <Form.Item name={'fullName'}
                                                       rules={[
                                                         {
                                                           required: true,
                                                           message: 'Full Name is required'
                                                         },
                                                         {
                                                           min: 6,
                                                           message: 'Full Name must be at least 6 characters'
                                                         }
                                                       ]}
                                                       validateTrigger="onBlur"
                                            >
                                                <Input
                                                    onChange={handleChangeInput}
                                                    type="text"
                                                    className="border w-full p-1"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <label htmlFor="about">About:</label>
                                            <Form.Item name={'aboutMe'}
                                                       rules={[
                                                         {
                                                           min: 20,
                                                           message: 'Info about you must be at least 20 characters'
                                                         }
                                                       ]}
                                                       validateTrigger="onBlur"
                                            >
                                                <TextArea
                                                    onChange={handleChangeTextArea}
                                                    placeholder="Little info about yourself "
                                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                                />
                                            </Form.Item>

                                        </div>
                                    </div>
                                    {/* Work info */}
                                    <div>
                                        <h6 className={titlesStyle}>Work Information</h6>
                                        <div>
                                            <label htmlFor="lookingForJob">Are you looking for a job?</label>
                                            <Form.Item name={'lookingForAJob'}>
                                                <Select value={lookingForAJobValue} onChange={handleSelectChange}>
                                                    <Select.Option value="Yes">Yes</Select.Option>
                                                    <Select.Option value="No">No</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <label htmlFor="workInfo">Work/ Skills info*:</label>
                                            <Form.Item name={'lookingForAJobDescription'}
                                                       rules={[
                                                         {
                                                           required: true,
                                                           message: 'Required field'
                                                         },
                                                         {
                                                           min: 20,
                                                           message: 'Info about you must be at least 20 characters'
                                                         }
                                                       ]}
                                                       validateTrigger="onBlur"

                                            >
                                                <TextArea onChange={handleChangeTextArea}
                                                          autoSize={{ minRows: 3, maxRows: 5 }}
                                                          value={lookingForAJobDescription}/>
                                            </Form.Item>

                                        </div>
                                    </div>
                                </div>
                                {/* Contacts info */}
                                <div className="mb-8">
                                    <h6 className={mainTitleStyle}>Contacts</h6>
                                    {contactsArray.map((contact, index) => <div key={index}>
                                        <label>{contact.label}</label>
                                        <Form.Item name={contact.contactType} rules={[{
                                          pattern: contactUrlCheck,
                                          message: 'Please enter a valid URL'

                                        }]} validateTrigger="onBlur">
                                            <Input onChange={handleChangeInput} className="border w-full p-1"/>
                                        </Form.Item>
                                    </div>)}
                                </div>
                                <div className="absolute right-2 bottom-2">
                                    <Button
                                        loading={isUserDataUpdating}
                                        htmlType={'submit'}
                                        type="primary"
                                        className="bg-blue-500"
                                    >
                                        {isUserDataUpdating ? 'Updating...' : 'Update Profile'}
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
  )
}

export default EditProfileModal
