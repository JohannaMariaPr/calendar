import '../App.css'
import EventList from '../components/EventList';
import myImage from '../assets/calendarimage.png';
import Searchfield from '../components/Searchfield';
import { useState, useEffect } from 'react';

const events = [
  {id: 1, title: "Meeting", date: "2026-02-18", description: "About party in Aarhus"},
  {id: 2, title: "Whatever", date: "2026-02-17", description: "About nihilist meeting"},
  {id: 3, title: "Workshop", date: "2026-04-01", description: "About making your own candles"},
  {id: 4, title: "Dance Class", date: "2026-05-06", description: "About Zumba dance class"},
  {id: 5, title: "Workout", date: "2026-06-04", description: "About weight lifting workout"},
];

function DefaultPage() {
  // Looks for information in webstorage, if there is some filterText is equal to that value, else it is an empty string
  const [filterText, setFilterText] = useState(() => { 
    const savedFilterText = localStorage.getItem("filterTextinStorage");
    return savedFilterText ? savedFilterText : "";
  });

  // Everytime the filterText variable changes, the info is saved to webstorage, with the key "filterTextinStorage"
  useEffect(() => {
    localStorage.setItem("filterTextinStorage", filterText)
  }, [filterText])

  const sortedEvents = events.toSorted((a,b) =>
    a.date.localeCompare(b.date, "en", {sensitivity: "base"})
  );

  // Filter events based on the user input
  //const filteredEvents = sortedEvents.filter(event =>
    //event.title.toLowerCase().includes(filterText.toLowerCase())
  //);

  const filteredEvents = sortedEvents.filter(event =>
    event.title.toLowerCase().includes(filterText.toLowerCase()) ||
    event.description.toLowerCase().includes(filterText.toLowerCase())
);

  // Event Handler function
  // Change the value of variable "filtertext"
  // makes the component re-render
  const handleInputChange = (event) => {
    setFilterText(event.target.value);
  }

  return (
    <div>
      <img className="image" src={myImage} alt="This is a picture of a calendar" />
      <Searchfield handleinput={handleInputChange} filter={filterText}/>
      <EventList events={filteredEvents} />
    </div>
  )
}

export default DefaultPage