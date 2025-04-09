import React from 'react'

const NewsCard: React.FC = () => {
  return (
    <div className='rounded-lg bg-white p-4 shadow'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>News</h2>
        <a
          href='https://www.facebook.com/people/Bharatiya-PopularParty/pfbid0MCLYmKcTbuZK42LHY4fHFbqsTeXWK7wK6whTMqFUkktLc6b1sYMS7Axd118Jzvhol/'
          className='text-sm font-medium text-blue-500 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          View All News &rsaquo;
        </a>
      </div>
      <div className='relative w-full overflow-hidden'>
        <iframe
          src='https://www.facebook.com/people/Bharatiya-PopularParty/pfbid0MCLYmKcTbuZK42LHY4fHFbqsTeXWK7wK6whTMqFUkktLc6b1sYMS7Axd118Jzvhol/'
          width='100%'
          style={{
            border: 'none',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'white',
          }}
          scrolling='no'
          frameBorder='0'
          allowFullScreen={true}
          allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
        ></iframe>
      </div>
    </div>
  )
}

export default NewsCard
