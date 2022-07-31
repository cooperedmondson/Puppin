import React, { useEffect, useState} from 'react'


const CreateReview = (props) => {
    // const [eventData, setEventData] = useState([]);
    let [gotToken, setGotToken] = useState(false)
    const [selectedEvent, setEvent] = useState("")
    const [userEvents, setEvents] = useState([])
    const [formData, setFormData] = useState({
        reviewer_username: "",
        review_event_id: "",
        review_event: "",
        review_description: "",
        attendee_rating: true,
        location_rating: ""
        });

    if (props.token && gotToken == false){
        console.log("yes token")
        fetch(`http://localhost:8001/api/currentuser/${props.token}`)
            .then(response => response.json())
            .then(response => fetch(`http://localhost:8000/api/events/myevents/`)
            .then(response => response.json())
            .then(response => setEvents(response)))
            
        setGotToken(true)
    };


    const loadSelectedEvent = async (event) => {
        event.preventDefault();
        const eventId = event.target.value
        setSelectedDog(event.target.value)
        const eventUrl = `http://localhost:8000/api/events/${event_id}`
        const fetchConfig = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }

            const response = await fetch(eventUrl, fetchConfig)
            if (response.ok) {
                const eventInfo = await response.json()
                console.log(eventInfo)
                // setFormData(eventInfo)
            }

    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {...formData}
        // console.log(data)
        const reviewUrl = "/api/event/reviews/create"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        
        const response = await fetch(reviewUrl, fetchConfig)
        if (response.ok) {
            const newReview = await response.json()
            console.log(newReview )
            setFormData({
                reviewer_username: "",
                review_event_id: "",
                review_event: "",
                review_description: "",
                attendee_rating: true,
                location_rating: ""
            })
        }
    
    }


return (
<div className='flex flex-col text-gray-900 py-2'>
    <div className='flex flex-col justify-center'>  
            <form className='max-w-[400px] w-full mx-auto bg-gray-200 p-8 px-8 rounded-lg shadow-xl' onSubmit={handleSubmit}>
                <h2 className='text-3xl text-black uppercase font-semibold text-center'>Review My Events</h2>
                <div className='flex flex-col text-gray-900 py-2'>
                    <label>Select Event to Review</label>
                    <select onChange = {event => loadSelectedEvent(event)} id = "dog-select" className="form-select bg-blue-700 hover:bg-slate-700 py-2 px-4 rounded font-bold uppercase hover:bg-blue-300 shadow-sm text-white">
                        <option value="" id="dog_select" >Select Event</option>
                        {userEvents && userEvents.map(userEvent => {
                            return (
                                <option key = {userEvent.id} value ={userEvent.dog_id} > 
                                    {userEvent.dog_name}
                                </option>)})} 
                    </select>
                </div>
                <label>Event Review</label>
                <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.review_description} onChange={(event) => setFormData({...formData, review_description: event.target.value})}/>
                <label>Attendee Review</label>
                {/* List attendees with checkboxes */}
                <label>Location Rating</label>
                <input  className='rounded-lg bg-gray-300 mt-2 p-2 hover:bg-gray-400' type="textarea" value={formData.location_description} onChange={(event) => setFormData({...formData, review_description: event.target.value})}/>
            </form>
    </div>
</div>
)
}

export default CreateReview