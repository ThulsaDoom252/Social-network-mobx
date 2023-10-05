import React from 'react';
import {Transition} from "react-transition-group";
import Select from "antd/es/select";
import {
    byNameAlphabet,
    byNameReverse,
    byNoPhoto,
    byPhoto,
    sortDefaultValue
} from "../../context/sortModes";


interface FriendsMenuProps {
    isOpen: boolean;
    sortByNameValue?: string,
    sortByPhotoValue?: string,
    handleCurrentSortTypeValue?: (value: string) => void,
}

const FriendsSearchMenu: React.FC<FriendsMenuProps> = ({
                                                           isOpen,
                                                           sortByNameValue,
                                                           sortByPhotoValue,
                                                           handleCurrentSortTypeValue,
                                                       }) => {
    return (
        <Transition in={isOpen} timeout={1000}>
            {(state) =>
                isOpen ? (
                    <div className={`menu ${state}`}>
                        <div className="bg-white w-64 p-2 rounded-md flex flex-col items-center">
                            <div className="w-full flex flex-col items-center">
                                <div>
                                    <p>Sort by name:</p>
                                    <Select size="small" value={sortByNameValue} style={{width: 200}}
                                            onChange={ handleCurrentSortTypeValue}>
                                        <Select.Option value={byNameAlphabet}>Alphabet order</Select.Option>
                                        <Select.Option value={byNameReverse}>Reverse order</Select.Option>
                                        <Select.Option value={sortDefaultValue}>Default</Select.Option>
                                    </Select>
                                    <p>Sort by photo:</p>
                                    <Select size="small" value={sortByPhotoValue} style={{width: 200}}
                                            onChange={handleCurrentSortTypeValue}>
                                        <Select.Option value={byPhoto}>With Photo</Select.Option>
                                        <Select.Option value={byNoPhoto}>Without photo</Select.Option>
                                        <Select.Option value={sortDefaultValue}>Default</Select.Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </Transition>
    );
};

export default FriendsSearchMenu;