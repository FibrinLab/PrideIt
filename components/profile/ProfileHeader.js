import React from 'react'
import { useRouter } from 'next/router'
import { BsArrowLeftShort } from 'react-icons/bs'

const isProfileImageNft = false

const currentAccount = '0xb5Dd83b2f1BAa2C73e14DE5061C2fb24c5cd2af5'

const style = {
    wrapper: `border-[#38444d] border-b`,
    header: `py-1 px-3 mt-2 flex items-center`,
    primary: `bg-transparent outline-none font-bold`,
    secondary: `text-[#8899a6] text-xs`,
    backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
    coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
    coverPhoto: `object-cover h-full w-full`,
    profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
    profileImage: `object-cover rounded-full h-full`,
    profileImageNft: `object-cover h-full`,
    profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
    details: `px-3`,
    nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
    activeNav: `text-white`,
}

  
const ProfileHeader = () => {
    const router = useRouter();

  return (
    <div className={style.wrapper}>
        <div className={style.header}>
            <div onClick={() => router.push('/')} className={style.backButton}>
                <BsArrowLeftShort />
            </div>
            <div className={style.details}>
                <div className={style.primary}>Akan Osutuk</div>
                <div className={style.secondary}>12 tweets</div>
            </div>
        </div>
        <div className={style.coverPhotoContainer}>
            <img 
                src='https://wonderfulengineering.com/wp-content/uploads/2014/05/twitter-header-cover-1500x500.jpg'
                alt='cover'
                className={style.coverPhoto}
            />
        </div>
        <div className={style.profileImageContainer}>
            <div className={isProfileImageNft ? 'hex' : style.profileImageContainer}>
                <img
                    src='https://pbs.twimg.com/media/FEaFK4OWUAAlgiV?format=jpg&name=medium'
                    alt='akan'
                    className={isProfileImageNft ? style.profileImageNft : style.profileImage}
                />
            </div>
        </div>
        <div className={style.details}>
            <div>
                <div className={style.primary}>Akan Osutuk</div>
            </div>
            <div className={style.secondary}>
                {currentAccount && (
                    <>
                        @{currentAccount.slice(0,6)}....{currentAccount.slice(-5)}
                    </>
                )}
            </div>
        </div>
        <div className={style.nav}>
            <div className={style.activeNav}>Tweets</div>
            <div>Tweets and Replies</div>
            <div>Media</div>
            <div>Likes</div>
        </div>
    </div>
  )
}

export default ProfileHeader