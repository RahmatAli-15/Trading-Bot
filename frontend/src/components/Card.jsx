import React from 'react';

const Card = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((article, index) => (
                <div 
                    key={index} 
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                    <img 
                        src={article.urlToImage || 'https://via.placeholder.com/300'} 
                        alt={article.title} 
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                        <p className="text-gray-700 text-base">{article.description}</p>
                    </div>
                    <div className="p-4 bg-gray-100">
                        <a href={article.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Read More
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
