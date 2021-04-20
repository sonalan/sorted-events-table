import React,{useState,useEffect} from 'react';

import "./Events.css";

function Events() {
    const [events, setEvents]= useState([]);
    const [artists, setArtists]= useState([]);
    const [venues, setVenues]= useState([]);
    const [isLoading,setLoading]= useState(false);
    const [isAscending,setIsAscending]= useState(false);

    const [sortedBy, setSortedBy] = useState('Id');

    const base_url='https://oll-coding-exercise.s3-us-west-2.amazonaws.com';
    
    useEffect(()=>{
        setLoading(true);
        fetch(`${base_url}/artists.json`)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                //console.log(data);
                setArtists(data);
            });

            fetch(`${base_url}/venues.json`)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                //console.log(data);
                setVenues(data);
            });
            //https://oll-coding-exercise.s3-us-west-2.amazonaws.com/venues.json
        fetch(`${base_url}/events.json`)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
               
                setEvents(data);
                setLoading(false)
            });
    },[])

    const Venue=({venue})=>{
        return (
            <>
                <h4>{venue.name}</h4>
                 <address>{venue.address}</address>
            </>
        )
    }

    const EventDate =({timeStamp})=>{
        const eventDate = new Date(timeStamp*1000).toLocaleDateString("en-US")
        const eventTime = new Date(timeStamp*1000).toLocaleTimeString("en-US");
        return (
            <span>{eventDate} {eventTime}</span>
        )
    }



    function sortDirection(a,b,isAsc){
        if(isAsc){
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
        }else{
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
        }
        return 0;
    }

    const sortByEvent=()=>{
        setIsAscending(!isAscending);
        
        events.sort((a,b)=>{
            let eventA = a.title;
            let eventB = b.title;

            return sortDirection(eventA,eventB,isAscending);
            
            
        })
        setSortedBy('Event');
        
    }
    const sortByArtist=()=>{
        setIsAscending(!isAscending);
        events.sort((a,b)=>{
            const eventA = artists.find(x=>x.id===Object.values(a)[4]).name;
            const eventB = artists.find(x=>x.id===Object.values(b)[4]).name;
            
            //console.log(eventA,eventB);
            return sortDirection(eventA,eventB,isAscending);
        })
        setSortedBy('Artist');
    }

    const sortByGenre=()=>{
        setIsAscending(!isAscending);
        events.sort((a,b)=>{
            const eventA = artists.find(x=>x.id===Object.values(a)[4]).genre;
            const eventB = artists.find(x=>x.id===Object.values(b)[4]).genre;
        
            return sortDirection(eventA,eventB,isAscending);
        })
        setSortedBy('Genre');
    }

    const sortByVenueName=()=>{
        setIsAscending(!isAscending);
        events.sort((a,b)=>{
            const eventA = venues.find(x=>x.id===Object.values(a)[5]).name;
            const eventB = venues.find(x=>x.id===Object.values(b)[5]).name;
            
            return sortDirection(eventA,eventB,isAscending);
        })
        setSortedBy('Venue');
    }

    const sortByDate = () => {
        setIsAscending(!isAscending);
        events.sort((a,b)=>{
            return sortDirection(a.date,b.date,isAscending);
        })
        setSortedBy('Date');
    }

    const sortById = () => {
        setIsAscending(!isAscending);
        events.sort((a,b)=>{
            return sortDirection(a.id,b.id,isAscending);
        })
        setSortedBy('Id');
    }

    const sortByPrice = () => {
        
        setIsAscending(!isAscending);
        events.sort((a,b)=>{
            return sortDirection(a.price,b.price,isAscending);
        })
        setSortedBy('Price');
    }
    
    const DirectionIcon = ({direction}) => direction?<i className="bi bi-caret-down-fill"></i>:<i className="bi bi-caret-up-fill"></i>

    return (
        <div>
            {isLoading&&
            (
                <span>Loading please wait!</span>
            )
            }
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th className="sortable" onClick={sortById}>
                            Id
                            {sortedBy==='Id'&&<DirectionIcon direction={isAscending} />}
                        </th>
                        <th className="sortable" onClick={sortByEvent}>
                            Event Name
                            {sortedBy==='Event'&&<DirectionIcon direction={isAscending} />}
                        </th>
                        <th className="sortable" onClick={sortByArtist}>
                            Artist
                            {sortedBy==='Artist'&&<DirectionIcon direction={isAscending} />}
                        </th>
                        <th className="sortable" onClick={sortByGenre}>
                            Genre
                            {sortedBy==='Genre'&&<DirectionIcon direction={isAscending} />}
                        </th>
                        <th className="sortable" onClick={sortByVenueName}>Venue
                            {sortedBy==='Venue'&&<DirectionIcon direction={isAscending} />}
                        </th>
                        <th className="sortable" onClick={sortByPrice}>
                            Price
                            {sortedBy==='Price'&&<DirectionIcon direction={isAscending} />}
                        </th>
                        <th>Icon</th>
                        <th className="sortable" onClick={sortByDate}>
                            Event Date
                            {sortedBy==='Date'&&<DirectionIcon direction={isAscending} />}
                        </th>
                    </tr>
                </thead>
                <tbody>
                {events?events.map(event=>{
                    const artist = artists.find(artist=> artist.id===event.artist_id);
                    const venue = venues.find(venue=> venue.id===event.venue_id);
                    return (
                        
                        <tr key={event.id.toString()} >
                            <td>{event.id}</td>
                            <td>{event.title}</td>
                            <td>{artist&& <span>{artist.name}</span>}</td>
                            <td>{artist&& <span>{artist.genre}</span>}</td>
                            <td>{venue&& <Venue venue={venue} />}</td>
                            <td>${event.price}</td>
                            <td>
                            {venue&&<img src={venue.icon} className="icon" alt={venue.name} />}</td>
                            <td>
                                <EventDate timeStamp={event.date} />
                            </td>
                        </tr>
                    )
                }):(
                    <tr>
                        <td>
                            <div> There is no Events </div>
                        </td>
                    </tr>
                    
                )

                }
                </tbody>
            </table>
        </div>
    )
}


export default Events
