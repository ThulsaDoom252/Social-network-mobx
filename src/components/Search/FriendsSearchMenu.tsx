import React from 'react';
import {Transition} from "@headlessui/react";
import Select from "antd/es/select";
import {
    byNameAlphabet,
    byNameReverse,
    byNoPhoto,
    byPhoto,
    sortDefaultValue
} from "../../context/sortModes";

// Props interface for the FriendsSearchMenu component
interface FriendsMenuProps {
    isOpen: boolean;                               // Flag to indicate if the menu is open
    sortByNameValue?: string;                      // Value for sorting by name
    sortByPhotoValue?: string;                     // Value for sorting by photo
    handleCurrentSortTypeValue?: (value: string) => void;   // Function to handle sorting type change
}

const FriendsSearchMenu: React.FC<FriendsMenuProps> = ({
                                                           isOpen,
                                                           sortByNameValue,
                                                           sortByPhotoValue,
                                                           handleCurrentSortTypeValue,
                                                       }) => {
    return (
        <Transition show={isOpen}
                    enter={'transition ease-out duration-300'}
                    enterFrom={"opacity-0"}
                    enterTo={"opacity-100"}
                    leave={"transition ease-in duration-200"}
                    leaveFrom={"opacity-100"}
                    leaveTo={"opacity-0"}

        >
            <div className={`menu`}>
                <div className="bg-white w-64 p-2 rounded-md flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                        <div>
                            <p>Sort by name:</p>
                            {/* Dropdown to select sorting by name */}
                            <Select
                                size="small"
                                value={sortByNameValue}
                                style={{width: 200}}
                                onChange={handleCurrentSortTypeValue}
                            >
                                <Select.Option value={byNameAlphabet}>Alphabet order</Select.Option>
                                <Select.Option value={byNameReverse}>Reverse order</Select.Option>
                                <Select.Option value={sortDefaultValue}>Default</Select.Option>
                            </Select>
                            <p>Sort by photo:</p>
                            {/* Dropdown to select sorting by photo presence */}
                            <Select
                                size="small"
                                value={sortByPhotoValue}
                                style={{width: 200}}
                                onChange={handleCurrentSortTypeValue}
                            >
                                <Select.Option value={byPhoto}>With Photo</Select.Option>
                                <Select.Option value={byNoPhoto}>Without photo</Select.Option>
                                <Select.Option value={sortDefaultValue}>Default</Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default FriendsSearchMenu;
