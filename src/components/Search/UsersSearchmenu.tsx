import React from 'react'
import Select from 'antd/es/select'
import {Transition} from '@headlessui/react'
import {Slider} from 'antd'
import {
    photoFilterEnum, statusFilterEnum,
} from '../../context/filterModes'

interface UsersSearchMenuProps {
    isOpen: boolean
    handleUsersPerPage: (value: number) => void
    usersPerPage: number
    filterByPhotoMode: photoFilterEnum
    filterByStatusMode: statusFilterEnum
    handleFilterByPhotoMode: (value: photoFilterEnum) => void
    handleFilterByStatusMode: (value: statusFilterEnum) => void
    sortByName?: () => void
    sortByPhoto?: () => void
}

const UsersSearchMenu: React.FC<UsersSearchMenuProps> = ({
                                                             isOpen,
                                                             usersPerPage,
                                                             handleUsersPerPage,
                                                             filterByPhotoMode,
                                                             filterByStatusMode,
                                                             handleFilterByPhotoMode,
                                                             handleFilterByStatusMode
                                                         }) => {
    const handleStatusFilterModeChange = (value: statusFilterEnum) => {
        handleFilterByStatusMode(value)
    }

    const handlePhotoFilterModeChange = (value: photoFilterEnum) => {
        handleFilterByPhotoMode(value)
    }

    return (
        <Transition show={isOpen}
                    enter={'transition ease-out duration-300'}
                    enterFrom={'opacity-0'}
                    enterTo={'opacity-100'}
                    leave={'transition ease-in duration-200'}
                    leaveFrom={'opacity-100'}
                    leaveTo={'opacity-0'}

        >
            <div className={'menu'}>
                <div className="bg-white w-64 p-2 rounded-md flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                        <div>
                            <h6>Show only</h6>
                            <hr/>
                            <p>By photo:</p>
                            <Select size="small" value={filterByPhotoMode} style={{width: 200}}
                                    onChange={handlePhotoFilterModeChange}>
                                <Select.Option value={photoFilterEnum.WithPhoto}>With photo</Select.Option>
                                <Select.Option value={photoFilterEnum.WithoutPhoto}>Without photo</Select.Option>
                                <Select.Option value={photoFilterEnum.Default}>Show all</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <p>By status:</p>
                            <Select size="small" value={filterByStatusMode} style={{width: 200}}
                                    onChange={handleStatusFilterModeChange}>
                                <Select.Option value={statusFilterEnum.WithStatus}>With status</Select.Option>
                                <Select.Option value={statusFilterEnum.WithoutStatus}>Without status</Select.Option>
                                <Select.Option value={statusFilterEnum.Default}>Show all</Select.Option>
                            </Select>
                        </div>
                        <div className={'w-full'}>
                            <span>Count:</span>
                            <span className={'ml-2'}>{usersPerPage}</span>
                            <Slider defaultValue={usersPerPage} min={10} max={100}
                                    onChange={handleUsersPerPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export default UsersSearchMenu
