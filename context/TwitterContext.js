import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [tweets, setTweets] = useState([])

    const router = useRouter()

    useEffect(() => {
        isAuthenticated();
    }, [])

    useEffect(() => {
        if (!currentAccount && appStatus == 'connected') return
    }, [currentAccount, appStatus])

    const isAuthenticated = async () => {
        if(!window.ethereum) return
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            }) 
            if (addressArray.lenght > 0) {
                setAppStatus('Connected')
                setCurrentAccount(addressArray[0])

                createUserAccount(addressArray[0])
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const connectWallet = async () => {
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try {
            setAppStatus('loading')

            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (addressArray > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            } else {
                router.push('/')
                setAppStatus('notConnected')
            }
        } catch(error) {
            setAppStatus(error)
        }
    }

   
    const createUserAccount = async (userWalletAddress = currentAccount) => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const userDoc = {
                _type: 'users',
                _id: userWalletAddress,
                name: 'Unnamed',
                isProfileImageNft: false,
                profileImage:
                  'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
                walletAddress: userWalletAddress,
            }

            await client.createIfNotExists(userDoc)
            setAppStatus('connected')
        } catch (error) {
            router.push('/')
            setAppStatus('error')
        }
    }

    const fetchTweets = async () => {
        const query = `
        *[_type == "tweets"]{
            "author": author->{name, walletAddress, profileImage, isProfileImageNft},
            tweet,
            timestamp
        }|order(timestamp desc)
        `

        const sanityResponse = await client.fetch(query)

        setTweets([])

        sanityResponse.forEach(async item => {
            const newItem = {
                tweet: item.tweet,
                timestamp: item.timestamp,
                author: {
                  name: item.author.name,
                  walletAddress: item.author.walletAddress,
                  profileImage: profileImageUrl,
                  isProfileImageNft: item.author.isProfileImageNft,
                },
            }
            setTweets(prevState => [...prevState, newItem])
        })

    }

    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if (appStatus !== 'connected') return
    
        const query = `
          *[_type == "users" && _id == "${userAccount}"]{
            "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
            name,
            profileImage,
            isProfileImageNft,
            coverImage,
            walletAddress
          }
        `

        const response = await client.fetch(query)

        setCurrentUser({
            tweets: response[0].tweets,
            name: response[0].name,
            profileImage: profileImageUri,
            walletAddress: response[0].walletAddress,
            coverImage: response[0].coverImage,
            isProfileImageNft: response[0].isProfileImageNft,
        })
    }

    return (
        <TwitterContext.Provider value={{ 
            appStatus, 
            currentAccount, 
            connectWallet, 
            fetchTweets, 
            tweets, 
            currentUser, 
            getCurrentUserDetails 
        }}>{children}</TwitterContext.Provider>
    )
}