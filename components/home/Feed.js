import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'

const style = {
    wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
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


function Feed() {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>
            <TweetBox />
            {
                tweets.map((tweet, index) => (
                    <Post 
                        key={index}
                        displayName={tweet.displayName}
                        userName={`${tweet.userName.slice(0, 4)}...${tweet.userName.slice(-4)}`}
                        avatar={tweet.avatar}
                        text={tweet.text}
                        isProfileImageNft={tweet.isProfileImageNft}
                        timestamp={tweet.timestamp}
                    />
                ))
            }
        </div>
    )

}

export default Feed