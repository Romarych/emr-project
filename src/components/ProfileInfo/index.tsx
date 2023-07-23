import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useReactiveVar } from '@apollo/client';

import { listInfo } from './listInfo';
import { setClients } from '../../cache';
import { setClient } from '../../cache';
import { setIsNewClient } from '../../cache';
import { ClientType } from '../../types';

import order from '../../static/images/order.png';
import note from '../../static/images/note.png';
import cross from '../../static/images/cross.png';
import check from '../../static/images/check.png';
import arrow from '../../static/images/arrow.png';
import save from '../../static/images/save.png';
import checkInput from '../../static/images/check-input.svg';
import uploadPhoto from '../../static/images/upload-photo.svg';


const ProfileInfo = () => {
    const isNewClient = useReactiveVar(setIsNewClient);
    const clients = useReactiveVar(setClients);
    const client = useReactiveVar(setClient);

    const [isChange, setIsChange] = useState<boolean>(false);
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        setIsChange(isNewClient);
        setPhoto(client?.photo || '');
    }, [client, isNewClient]);

    const submit = (values: ClientType) => {
        const uniqueId = () => {
            const dateString = Date.now().toString(36);
            const randomness = Math.random().toString(36).substr(2);
            return dateString + randomness;
        };

        setIsChange(false);
        setIsNewClient(false);

        if (isNewClient) {
            const id = uniqueId();
            setClients([...clients, { ...values, id, photo }]);
            setClient({ ...values, id, photo });
        } else {
            setClient({ ...values, id: client!.id, photo });
            setClients(clients.map(item => item.id === client?.id ? { ...values, photo: photo || item.photo } : item));
        }
    };

    return (
        <>
            {(isNewClient || client) ?
                <div>
                    <div className='w-[476px] bg-white-2 ml-[296px] rounded-sm mb-[56px]'>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                id: client?.id || '',
                                isChange: isChange,
                                photo: client?.photo || '',
                                fullName: client?.fullName || 'None',
                                gender: client?.gender || '',
                                dob: client?.dob || 'None',
                                weight: client?.weight || 'None',
                                height: client?.height || 'None',
                                phone: client?.phone || 'None',
                                address: client?.address || 'None',
                                email: client?.email || 'None',
                                medical: client?.medical || 'None',
                                instagram: client?.instagram || 'None',
                                facebook: client?.facebook || 'None',
                                recomendations: client?.recomendations || 'None',
                                notificationsSMS: client?.notificationsSMS || false,
                                notificationsEmail: client?.notificationsEmail || false,
                                comments: client?.comments || ''
                            }}
                            onSubmit={submit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className=' mt-[96px] mx-5 py-6 flex border-b border-b-gray-3'>
                                        <div className='relative flex justify-center mr-5'>
                                            <img src={photo || client?.photo || 'https://placehold.co/136x136'} alt="Avatar" className='h-[136px] w-[136px] rounded-full' />
                                            {isChange && <>
                                                <img src={uploadPhoto} alt="Upload photo" className='h-6 w-6 absolute top-[105px]' />
                                                <input
                                                    onChange={e => {
                                                        const file = e.target.files?.length && e.target.files[0]
                                                        const url = file ? URL.createObjectURL(file as unknown as Blob) : '';
                                                        setPhoto(url);
                                                    }}
                                                    placeholder="Upload file" type="file" name='photo'
                                                    accept="image/png, image/jpeg"
                                                    className='h-[136px] w-[136px] rounded-full cursor-pointer mx-auto opacity-0 absolute top-0 left-0' />
                                            </>}
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <Field name='fullName' className={`${!isChange ? 'bg-transparent' : 'bg-gray-1'} w-full mb-3 rounded-sm h-[29px] outline outline-0`} type="text" disabled={!isChange} />
                                                    <div className='w-[281px]'>
                                                        <div className='text-right mb-3'>
                                                            <span className='float-left flex items-center text-[13px] font-light leading-4 h-[29px]'>Gender:</span>
                                                            <div className='relative'>
                                                                <Field as="select" name='gender' className={`${!isChange ? 'bg-transparent' : 'bg-gray-1'} w-[219px] h-[29px] ${isChange && 'bg-[url("./static/images/arrow-input.svg")]'} bg-no-repeat bg-right rounded-sm outline outline-0 appearance-none`} disabled={!isChange}>
                                                                    <option value="M">{isChange ? 'Male' : 'M'}</option>
                                                                    <option value="F">{isChange ? 'Female' : 'F'}</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div className='text-right mb-3'>
                                                            <span className='float-left flex items-center text-[13px] font-light leading-4 h-[29px]'>DOB:</span>
                                                            <Field name='dob' className={`${!isChange ? 'bg-transparent' : 'bg-gray-1'} w-[219px] rounded-sm h-[29px] outline outline-0`} type="text" disabled={!isChange} />
                                                        </div>
                                                        <div className='text-right mb-3'>
                                                            <span className='float-left flex items-center text-[13px] font-light leading-4 h-[29px]'>Weight:</span>
                                                            <Field name='weight' className={`${!isChange ? 'bg-transparent' : 'bg-gray-1'} w-[181px] rounded-sm h-[29px] outline outline-0`} type="text" disabled={!isChange} />
                                                            <div className='w-[38px] inline-block text-left pl-1 text-[13px] font-light leading-4'>lb.</div>
                                                        </div>
                                                        <div className='text-right'>
                                                            <span className='float-left flex items-center text-[13px] font-light leading-4 h-[29px]'>Height:</span>
                                                            <Field name='height' className={`${!isChange ? 'bg-transparent' : 'bg-gray-1'} w-[181px] rounded-sm h-[29px] outline outline-0`} type="text" disabled={!isChange} />
                                                            <div className='w-[38px] inline-block text-left pl-1 text-[13px] font-light leading-4'>ft.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!isChange &&
                                        <div className='flex py-8 mx-5 border-b border-b-gray-3'>
                                            <button type='button' className='bg-blue-1 w-[175px] h-[39px] mr-5 rounded-sm text-[13px] font-medium leading-4 text-gray-1 flex items-center justify-center'>
                                                <img src={order} alt="Order" className='h-6 w-6 mr-4' />
                                                Add New Order
                                            </button>
                                            <button type='button' className='bg-blue-1 w-[175px] h-[39px] rounded-sm text-[13px] font-medium leading-4 text-gray-1 flex items-center justify-center'>
                                                <img src={note} alt="Order" className='h-6 w-6 mr-4' />
                                                Add New Note
                                            </button>
                                        </div>}
                                    <div className='mx-5 mt-6'>
                                        {listInfo.map(item => <div key={item.name} className='text-right mb-3'>
                                            <img src={item.icon} alt={item.name} className='w-6 h-6 float-left' />
                                            <span className='float-left flex items-center text-[13px] font-light leading-4 h-[29px] pl-2'>{item.name}:</span>
                                            {item.name === 'Comments' ?
                                                <Field
                                                    name='comments'
                                                    as='textarea'
                                                    disabled={!isChange}
                                                    className="peer h-full min-h-[100px] w-full resize-none rounded-sm bg-gray-1 px-3 py-2.5 text-sm font-normal outline outline-0 transition-all focus:outline-0 disabled:resize-none"
                                                /> :
                                                item.name === 'Social Marketing & Notifications' ?
                                                    <div className='w-full inline-block text-[13px] font-light leading-4 ml-6  h-[64px]'>
                                                        <div className='w-full text-left'>
                                                            {!isChange ?
                                                                <div className='flex items-center h-[30px]'>
                                                                    <img src={client?.notificationsSMS ? check : cross} alt="" className='h-6 w-6 mr-1' />
                                                                    SMS
                                                                </div> :
                                                                <div className="inline-flex items-center">
                                                                    <label
                                                                        className="relative flex cursor-pointer items-center rounded-full p-2"
                                                                        htmlFor="checkbox"
                                                                        data-ripple-dark="true"
                                                                    >
                                                                        <Field
                                                                            name='notificationsSMS'
                                                                            type="checkbox"
                                                                            className="before:content[''] peer relative h-[14px] w-[14px] cursor-pointer appearance-none rounded-sm border-gray-5 border-2 transition-all before:transition-opacity checked:bg-transparent"
                                                                            id="checkbox"

                                                                        />
                                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                                            <img src={checkInput} alt="Check" className='h-3 w-3' />
                                                                        </div>
                                                                    </label>SMS
                                                                </div>}
                                                        </div>
                                                        <div className='w-full text-left'>
                                                            {!isChange ?
                                                                <div className='flex items-center h-[30px]'>
                                                                    <img src={client?.notificationsEmail ? check : cross} alt="" className='h-6 w-6 mr-1' />
                                                                    E-mail
                                                                </div> :
                                                                <div className="inline-flex items-center">
                                                                    <label
                                                                        className="relative flex cursor-pointer items-center rounded-full p-2"
                                                                        htmlFor="checkbox-2"
                                                                        data-ripple-dark="true"
                                                                    >
                                                                        <Field
                                                                            name='notificationsEmail'
                                                                            type="checkbox"
                                                                            className="before:content[''] peer relative h-[14px] w-[14px] cursor-pointer appearance-none rounded-sm border-gray-5 border-2 transition-all before:transition-opacity checked:bg-transparent"
                                                                            id="checkbox-2"

                                                                        />
                                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                                            <img src={checkInput} alt="Check" className='h-3 w-3' />
                                                                        </div>
                                                                    </label>E-mail
                                                                </div>}
                                                        </div>
                                                    </div> :
                                                    <Field name={item.name.toLowerCase().replace(' insurance', '').replace('-', '')} className={`${!isChange ? 'bg-transparent' : 'bg-gray-1'} outline outline-0 w-[219px] h-[29px] rounded-sm`} type='text' disabled={!isChange} />}
                                        </div>)}
                                    </div>
                                    {!isChange ?
                                        <div className='flex justify-end pb-3 pt-5'>
                                            <button type='button' onClick={() => setIsChange(!isChange)} className='bg-green-1 w-[157px] h-[39px] mr-5 rounded-sm text-[13px] font-medium leading-4 text-gray-1 flex items-center justify-center'>
                                                <img src={order} alt="Order" className='h-6 w-6 mr-4' />
                                                Change Info
                                            </button>
                                        </div> :
                                        <div className='flex justify-between pb-3 pt-5'>
                                            <button type='button' onClick={() => {
                                                setIsChange(!isChange);
                                                setPhoto('');
                                            }}
                                                className='bg-gray-1 w-[128px] h-[39px] mr-5 rounded-sm text-[13px] font-medium leading-4 text-black-1 flex items-center justify-center'>
                                                <img src={arrow} alt="Arrow" className='h-6 w-6 mr-4' />
                                                Cancel
                                            </button>
                                            <button type='submit' className='bg-green-1 w-[157px] h-[39px] mr-5 rounded-sm text-[13px] font-medium leading-4 text-gray-1 flex items-center justify-center'>
                                                <img src={save} alt="Save" className='h-6 w-6 mr-4' />
                                                Save Changes
                                            </button>
                                        </div>}
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className='w-[476px] bg-white-2 left-[788px] h-[calc(100vh-156px)] top-[96px] fixed rounded-sm mb-[56px]' />
                </div> :
                <div className='flex items-center h-screen w-screen pl-[280px] justify-center text-gray-6 text-3xl'><span>No Customer Selected</span></div>}
        </>
    );
};

export default ProfileInfo;