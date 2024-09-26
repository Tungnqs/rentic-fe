import React from 'react';
import { NodataIcon } from '../../assets/icon/icon';

const DataNotFound = () => {
    return (
        <div className='w-full p-5 flex flex-col gap-2 justify-center items-center group'>
            <div className='w-fit'><NodataIcon  className='w-12 '/></div>
            <div className='text-[24px] font-semibold group-hover:text-secondaryYellow'>No item found</div>
        </div>
    );
};

export default DataNotFound;