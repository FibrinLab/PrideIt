import React, { useContext, useEffect } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'

const style = {
    wrapper: `no-scrollbar`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}

const tweets = [
    {
        displayName: 'Akan',
        userName: '0xb5Dd83b2f1BAa2C73e14DE5061C2fb24c5cd2af5',
        avatar: 'https://pbs.twimg.com/media/FEaFK4OWUAAlgiV?format=jpg&name=medium',
        text: 'gm',
        isProfileImageNft: true,
        timestamp: '2022-07-08T12:00:00.000Z'
    },
    {
        displayName: 'Akan',
        userName: '0xb5Dd83b2f1BAa2C73e14DE5061C2fb24c5cd2af5',
        avatar: 'https://pbs.twimg.com/media/FEaFK4OWUAAlgiV?format=jpg&name=medium',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z'
    },
    {
        displayName: 'Akan',
        userName: '0xb5Dd83b2f1BAa2C73e14DE5061C2fb24c5cd2af5',
        avatar: 'https://pbs.twimg.com/media/FEaFK4OWUAAlgiV?format=jpg&name=medium',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z'
    },
]

const ProfileTweets = () => {
    const { currentAccount, currentUser } = useContext(TwitterContext)

  return (
    <div className={style.wrapper}>
        {tweets.map((tweet, index) => (
            <Post 
                key={index}
                displayName={currentUser.name === 'Unnamed' ? currentUser.walletAddress : currentUser.name}
                userName={`${currentAccount.slice(0,4)}...${currentAccount.slice(-4)}`}
                text={tweet.text}
                avatar={currentUser.ProfileImage}
                isProfileImageNft={tweet.isProfileImageNft}
                timestamp={tweet.timestamp}
            />
        ))}
    </div>
  )
}

export default ProfileTweets