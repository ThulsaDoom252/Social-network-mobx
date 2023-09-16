import React, {useEffect, useState} from 'react';
import {Modal, Input, Button} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';

interface StatusModalProps {
    visible: boolean;
    currentUserStatus: string,
    onClose: () => void;
    // status: string,
    handleChangeStatus: (status: string) => void
}

const StatusModal: React.FC<StatusModalProps> = ({
                                                     visible,
                                                     onClose,
                                                     // status,
                                                     handleChangeStatus,
                                                     currentUserStatus,
                                                 }) => {
    const [status, setStatus] = useState<string | null>(currentUserStatus)
    const [statusError, setStatusError] = useState<string | null>(null);

    useEffect(() => {
        setStatus(currentUserStatus)
    }, [currentUserStatus]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setStatus(value);
        if (value.length > 300) {
            setStatusError('Status should not exceed 300 characters.');
        } else {
            setStatusError(null);
        }
    };

    const handleUpdateStatus = () => {
        // Добавьте здесь логику обновления статуса
        handleChangeStatus(status ? status : '')
        onClose();
    };

    return (
        <Modal
            title="Status"
            visible={visible}
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
                    disabled={statusError !== null || status === null || status.length === 0}
                >
                    Update
                </Button>,
            ]}
        >
            <div className="status-modal-content">
                <Input.TextArea
                    style={{resize: 'none'}}
                    rows={4}
                    placeholder="My status"
                    value={status ? status : ''}
                    onChange={handleStatusChange}
                />
                {statusError && <div className="status-error">{statusError}</div>}
            </div>
        </Modal>
    );
};

export default StatusModal;