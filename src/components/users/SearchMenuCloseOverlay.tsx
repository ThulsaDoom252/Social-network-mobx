import React from 'react';

interface searchMenuCloseOverlayProps {
    toggleSearchMenu: React.Dispatch<React.SetStateAction<boolean>>

}


const SearchMenuCloseOverlay: React.FC<searchMenuCloseOverlayProps> = ({toggleSearchMenu}) => {
    return (
        <div className={'absolute inset-0  z-10'} onClick={() => toggleSearchMenu(false)}/>
    );
};

export default SearchMenuCloseOverlay;