"use client"

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from './MenuItem';
import Image from 'next/image'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useFeaturesModel from '@/hooks/useFeaturesModel';


const UserProfile = ({ currentUser, access }) => {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const featuresModel = useFeaturesModel();
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);

  }, [])
  const handleFeaturesToggle = () => {
    if (featuresModel.isOpen) {
      featuresModel.onClose()
    } else {
      featuresModel.onOpen()
    }
  }
  return (
    <div className=''>
      <div className='flex gap-3 items-center '>
        <div
          onClick={handleFeaturesToggle}
          className={`
        text-sm
        font-semibold
        py-2
        px-3
        rounded-full
        bg-slate-100
        hover:bg-slate-200
        transition
        cursor-pointer
        border
        border-slate-200
        ${featuresModel.isOpen && "border-2 bg-slate-200"}
    `}
        >
          Features
        </div>
        <div
          onClick={toggleOpen}
          className='relative px-2 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <div className=''>
            <Image className='rounded-full'
              src={currentUser?.image || "/images/placeholder.jpg"}
              width={30}
              height={30}
              alt='profile img'
            />
          </div>
          <AiOutlineMenu />
          {isOpen && (
            <div className='absolute rounded-xl shadow-md min-w-max bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer'>
              <>
                <MenuItem onClick={() => { router.push('/profile') }} label={currentUser?.password ? "Change password" : "Create password"} />
                {access && <MenuItem onClick={() => { router.push('/admin') }} label={`${currentUser?.role === 'admin' ? 'Admin' : 'Owner'}`} />}
                <hr />
                <MenuItem onClick={() => signOut({ callbackUrl: '/signin' })} label="SignOut" />
              </>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default UserProfile