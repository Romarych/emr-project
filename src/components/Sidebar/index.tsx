import React, { useEffect, useState } from 'react'

import { setClient, setClients, setIsNewClient } from '../../cache';

import square from '../../static/images/square.png'
import add from '../../static/images/add.png'
import close from '../../static/images/close.png'
import { useReactiveVar } from '@apollo/client';
import { ClientType } from '../../types';

const Sidebar = () => {
    const clients = useReactiveVar(setClients);
    const client = useReactiveVar(setClient);

    const [filterClients, setFilterClients] = useState<ClientType[] | undefined>(clients);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        setFilterClients(
            clients.filter(client =>
                client.fullName.toLowerCase()
                    .indexOf(value.toLowerCase()) >= 0)
        );
    }, [clients])

    const onChange = (text: string) => {
        setValue(text);
        setFilterClients(
            clients.filter(client =>
                client.fullName.toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0)
        );
    };

    return (
        <nav className='w-[240px] ml-[40px] bg-gray-1 h-screen fixed top-0 left-0 px-3 py-8'>
            <div className='mt-[80px] border-b border-gray-3 pb-8 mb-8'>
                <div className='text-brown-1 text-xl font-medium leading-6 mb-4'>Appointments</div>
                <div className='flex items-center text-black-1 text-base leading-5'>
                    <img src={square} alt="Square" className='h-6 mr-2' />
                    <div>Square Appointments</div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-xl font-medium leading-6 text-brown-1 mb-1'>Clients</span>
                <button onClick={() => {
                    setIsNewClient(true);
                    setClient(null);
                }}
                    className='underline flex text-green-1 text-base leading-5'>
                    Add New
                    <img src={add} alt="Add" className='h-6 ml-2' />
                </button>
            </div>
            <div className='relative'>
                <input value={value} onChange={e => onChange(e.target.value)} type="text" placeholder='Search ...' className='w-full relative h-10 text-base leading-5 border pl-2 border-gray-3 bg-transparent rounded-md my-4' />
                <img onClick={() => {
                    setValue('');
                    setFilterClients(clients);
                }} src={close} alt="Close" className='absolute right-1 top-1/2 h-6 -translate-y-1/2 cursor-pointer' />
            </div>
            {filterClients?.slice(0, 2).map((item, index) => {
                const fullName = item.fullName
                return <div key={index} onClick={() => setClient(item)} className={`${client?.id == item.id ? 'bg-yellow-1' : 'bg-white-1'} flex p-2 rounded-md overflow-hidden mb-2 cursor-pointer`}>
                    <img src={item.photo || 'https://placehold.co/56x56'} alt="Avatar" className='h-14 w-14 rounded-md mr-2' />
                    <div>
                        <div className='text-black-1 text-sm leading-4 font-medium whitespace-nowrap'>
                            {fullName.slice(0,13)}
                            {fullName.length > 12 ? '...' : ''}
                        </div>
                        <div className='text-[13px] font-light leading-4 text-black-1 mt-1'>Last visit: <span>03/05/2023</span></div>
                    </div>
                </div>
            })}
            {filterClients && filterClients?.length > 2 && <div className='text-[13px] leading-4 font-light text-center'>+ <span>{filterClients?.length - 2}</span> found records</div>}
        </nav>
    );
};

export default Sidebar;