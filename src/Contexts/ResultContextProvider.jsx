import { createContext, useContext, useState } from 'react'

export const resultContext = createContext();

const baseURL = 'https://google-search74.p.rapidapi.com/'
const newsURL = "https://google-api31.p.rapidapi.com/"
const imageURL = "https://google-api31.p.rapidapi.com/imagesearch"
const videoURL = "https://google-api31.p.rapidapi.com/videosearch"

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Google Web Search Code
    const getResults = async (query, type) => {
        setIsLoading(true);

        if (type === "search") {
            const res = await fetch(`${baseURL}${query}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
                }
            }
            )

            const data = await res.json();
            console.log("DATA", data);
            setResults(data.results);
        }

        if (type === "news") {
            console.log("news api hit");
            const res = await fetch(newsURL, {
                method: 'POST',
                headers: {
                    'Content-type': "application/json",
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
                },
                body:JSON.stringify({
                    "text": "India",
                    "region": "wt-wt",
                    "max_results": 10
                })
            }
            )

            const data = await res.json();
            console.log("news data", data);
            setResults(data.news);
        }

        if (type === "images") {
            console.log("images api hit");
            const res = await fetch(imageURL, {
                method: 'POST',
                headers: {
                    'Content-type': "application/json",
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
                },
                body:JSON.stringify({
                    "text": query,
                    "safesearch": "on",
                    "region": "wt-wt",
                    "color": "",
                    "size": "",
                    "type_image": "",
                    "layout": "",
                    "max_results": 100
                })
            }
            )

            const data = await res.json();
            console.log("image data", data);
            setResults(data.result);
        }

        if (type === "videos") {
            console.log("videos api hit");
            const res = await fetch(videoURL, {
                method: 'POST',
                headers: {
                    'Content-type': "application/json",
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
                },
                body:JSON.stringify({
                    "text": query,
                    "safesearch": "off",
                    "timelimit": "",
                    "duration": "",
                    "resolution": "",
                    "region": "wt-wt",
                    "max_results": 20
                })
            }
            )

            const data = await res.json();
            console.log("video data", data);
            setResults(data.result);
        }        

        setIsLoading(false);
    }

    return (
        <resultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading, setIsLoading }}>
            {children}
        </resultContext.Provider>
    )
}

export const useResultContext = () => useContext(resultContext);
