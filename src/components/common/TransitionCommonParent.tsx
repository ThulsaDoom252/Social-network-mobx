import React, {ReactNode} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {stopPropagation} from "../../common";


interface TransitionCommonParentModalProps {
    show: boolean,
    appear: boolean,
    width?: string,
    toggleModal: (value:boolean) => void,
    zIndex?: 'string',
    children: ReactNode,
}

const TransitionCommonParent:React.FC<TransitionCommonParentModalProps> = ({
                                    show,
                                    appear,
                                    width = 'w-300',
                                    toggleModal,
                                    zIndex = 'z-2',
                                    children,
                                }) => {
    return (
        <Transition appear={appear} show={show}
                    onClick={() => toggleModal(false)}
                    className={`absolute bg-opacity-50 w-screen h-screen bg-gray-500 ${zIndex}`}>
            <Dialog as='div' className={`
                absolute
                inset-1/2
                bg-white
                w-fit
                h-fit
                rounded
                transform -translate-x-1/2 -translate-y-1/2 
                ${zIndex}
                `}
                    onClose={() => toggleModal(false)}>
                <Transition.Child
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Dialog.Panel className={`
                    ${zIndex}
                    ${width}
                    relative
                    p-2
                    `}
                                  onClick={stopPropagation}>
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    )

};

export default TransitionCommonParent;