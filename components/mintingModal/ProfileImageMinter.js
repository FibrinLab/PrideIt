import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import InitialState from './InitialState'
import LoadingState from './LoadingState'
import FinishedState from './FinishedState'
import { TwitterContext } from '../../context/TwitterContext'

const ProfileImageMinter = () => {
    const { currentAccount, setAppStatus } = useContext(TwitterContext)
    const [status, setStatus] = useState('initial')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState()

    const router = useRouter()

    const mint = async () => {}


    const modalChildren = (modalStatus = status) => {
        switch (modalStatus) {
            case 'initial':
                return (
                    <InitialState
                        profileImage={profileImage}
                        setProfileImage={setProfileImage}
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        mint={mint}
                    />
            )

            case 'loading':
                return <LoadingState />

            case 'finished':
                return <FinishedState />

            default:
                router.push('/')
                setAppStatus('error')
                break
        }
    }
  return <>{modalChildren(status)}</>
}

export default ProfileImageMinter