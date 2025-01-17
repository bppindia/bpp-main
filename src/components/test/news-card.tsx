import React from "react";

const NewsCard: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">News</h2>
        <a
          href="https://www.facebook.com/people/Bharatiya-PopularParty/pfbid0MCLYmKcTbuZK42LHY4fHFbqsTeXWK7wK6whTMqFUkktLc6b1sYMS7Axd118Jzvhol/"
          className="text-sm font-medium text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All News &rsaquo;
        </a>
      </div>
      <div className="relative overflow-hidden w-full">
        <iframe
          src="https://www.facebook.com/people/Bharatiya-PopularParty/pfbid0MCLYmKcTbuZK42LHY4fHFbqsTeXWK7wK6whTMqFUkktLc6b1sYMS7Axd118Jzvhol/"
          width="100%"
          style={{
            border: "none",
            overflow: "hidden",
            position: "relative",
            backgroundColor: "white"
          }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default NewsCard;