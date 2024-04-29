import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import { useResultContext } from '../Contexts/ResultContextProvider';
import Loading from './Loading';

function Results() {

  const { results, isLoading, setIsLoading, getResults, searchTerm, setSearchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      if (location.pathname === "/search") {
        getResults(`?query=${searchTerm}&limit=10`, "search");
      }
      if (location.pathname === "/images") {
        getResults(searchTerm, "images");
      }
      if (location.pathname === "/videos") {
        getResults(searchTerm, "videos");
      }
    }
    if (location.pathname === "/news") {
      getResults("", "news");
    }
  }, [searchTerm, location])

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      console.log("entered search result");
      return (
        <div className='flex flex-wrap lg:px-56'>
          {searchTerm && results && results.map((val, index) => {
            return (
              <div key={index} className='md:w-1/2 w-full mt-6'>
                <a href={val.url} target='_blank' rel='noreferrer'>
                  <p className='text-sm'>
                    {val.url && val.url.length > 30 ? val.url.substring(0, 30) : val.url}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                    {val.title}
                  </p>
                </a>
              </div>
            )
          })}
        </div>
      )

    case "/news":
      console.log("entered news result");
      return (
        <div className="cards flex flex-wrap justify-between px-24">
          {results && results.map((val, index) => {
            return (
              <div key={index} className="card-list mb-10">
                <article className="card">
                  <figure className="card-image">
                    <img src={val.image} alt="#" />
                  </figure>
                  <div className="card-header">
                    <a href={val.url}>{val.title}</a>
                    <button className="icon-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Heart">
                        <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                      </svg>

                    </button>
                  </div>
                  <div className="card-footer">
                    <div className="card-meta card-meta--views">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="EyeOpen">
                        <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      2,465
                    </div>
                    <div className="card-meta card-meta--date">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
                        <rect x="2" y="4" width="20" height="18" rx="4" />
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <path d="M2 10h20" />
                      </svg>
                      {new Date(val.date).toDateString()}
                    </div>
                  </div>
                </article>
              </div>
            )
          }
          )
          }
        </div>
      )

    case "/images":
      console.log("entered images result");
      return (
        <div className="App">
          {searchTerm && results &&
            <LightGallery
              plugins={[lgThumbnail, lgZoom]}
              elementClassNames="flex flex-wrap justify-between space-y-4"
            >
              {results.map((val, index) => {
                return (
                  <a href={val.url} data-src={val.image} className='mt-4'>
                    <img alt={val.title} src={val.image} style={{ maxWidth: "400px", maxHeight: "400px" }} />
                  </a>)
              }
              )
              }
            </LightGallery>
          }
        </div>
      );
    case "/videos":
      console.log("entered videos result");
      return (
        <div className='flex flex-wrap justify-between space-y-4'>
          {searchTerm && results &&
            results.map((val, index) => {
              return(
              <ReactPlayer url={val.content} width='355px' height='200px' controls className="mt-4" />
              )
            }
            )
          }
        </div>
      );
    case "default":
      return ('Error');
  }
}

export default Results;
