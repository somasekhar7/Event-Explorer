import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchComponent.css'; // Import CSS file for styling
import axios from "axios";

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchContainerRef = useRef(null);


    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (e.target.value) {
            axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${e.target.value}&apikey=JGuimADvJB6gzXP7jnjTGaFsm91fdQjV`)
                .then(response => {
                    setSearchResults(response.data._embedded.events);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            setSearchResults([]);
        }
        if (query === '') {
            setSearchResults([]);
            return;
        }
    };

    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const countOccurrences = (arr, val) => {
        return arr.reduce((acc, item) => (item.name === val ? acc + 1 : acc), 0);
    };

    return (
        <div className="search-container">
            <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                className="form-control mr-sm-2"

            />
            {searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map((result, index) => (
                        <li key={result.id}>
                            <Link to={`/event/${result.id}`} className="event-link">
                                <img src={result.images[0].url} alt={result.name} className="result-image"/>
                                <span
                                    className={result.name.toLowerCase().includes(searchQuery) ? 'bold' : ''}>{result.name}</span>

                            </Link>
                            <span>{result.dates.start.localDate}</span>
                            {/*<span className="result-count">{countOccurrences(searchResults.slice(0, index), result.name)}</span>*/}

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;
