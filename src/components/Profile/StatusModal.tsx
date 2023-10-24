import React, {useEffect, useState} from 'react'
import {Modal, Input, Button} from 'antd'

interface StatusModalProps {
    visible: boolean
    currentUserStatus: string
    onClose: () => void
    handleChangeStatus: (status: string) => void
}

const StatusModal: React.FC<StatusModalProps> = ({
                                                     visible,
                                                     onClose,
                                                     handleChangeStatus,
                                                     currentUserStatus
                                                 }) => {
    // status value and status error states
    const [status, setStatus] = useState<string | null>(currentUserStatus)
    const [statusError, setStatusError] = useState<string | null>(null)

    const maxStatusLength: number = 300

    // Setting current user status on component mounting/state updating
    useEffect(() => {
        setStatus(currentUserStatus)
    }, [currentUserStatus])

    // Change/update handlers
    const handleStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setStatus(value)
        if (value.length > maxStatusLength) {
            setStatusError('Status should not exceed 300 characters.')
        } else {
            setStatusError(null)
        }
    }

    const handleUpdateStatus = () => {
        handleChangeStatus(status || '')
        onClose()
    }

    return (
        <Modal
            title="Status"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    className={'bg-blue-400'}
                    key="update"
                    type="primary"
                    onClick={handleUpdateStatus}
                    disabled={statusError !== null || status === null || currentUserStatus === status}
                >
                    Update
                </Button>
            ]}
        >
            <div className="status-modal-content">
                <Input.TextArea
                    style={{resize: 'none'}}
                    rows={4}
                    placeholder="My status"
                    value={status || ''}
                    onChange={handleStatusChange}
                />
                {statusError && <div className="status-error">{statusError}</div>}
            </div>
        </Modal>
    )
}

export default StatusModal
