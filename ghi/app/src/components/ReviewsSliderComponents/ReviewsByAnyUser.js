import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper'
import { AnimatePresence, motion } from 'framer-motion'


export default function ReviewsByAnyUser(props){

    let [eventReviews, setEventReviews] = useState([]);
    let [gotToken, setGotToken] = useState(false);
    let [accountId, setAccountId] = useState(props.userData);
    let [isLoaded, setIsLoaded] = useState(false);


    console.log("userdata status", props.userData)
    const openModel = () => {
        setOpen(true);
      };
    
      const closeModel = () => {
        setOpen(false);
      };
  
    const [open, setOpen] = useState(false);
    // if (userDataLoaded == null){
    //     setUserDataLoaded(userdata)
    //     console.log(userDataLoaded)

      if (props.userData.length != 0 && isLoaded == false){
        console.log("effected", props.userData)
        fetch(`http://localhost:8000/api/event/reviews/account=${props.userData.account_id}`)
            .then(response => response.json())
            .then(response => setEventReviews(response));
            setIsLoaded(true);}
        

    
    // if (props.userData && isLoaded == false) {
    //     console.log("why is it fetching", props.userData);
    //     fetch(`http://localhost:8000/api/event/reviews/account=${props.userData.account_id}`)
    //         .then(response => response.json())
    //         .then(response => setEventReviews(response));
    //     setIsLoaded(true)
    // }
    
    if (eventReviews != "loading"){
        return(
            <div className='w-screen py-20 ' id="about">
                <div className='max-w-[1300px] mx-auto py-10 mt-1'>
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold uppercase'>Event Reviews for a specific event</h2>
                    </div>
        
                    <div className=' grid-flow-row gap-10 px-4 py-20 text-center'>
                      <Swiper
                      freeMode={true}
                      grabCursor={false}
                      modules={FreeMode}
                      className='mySwiper py-10'
                      slidesPerView={3}
                      spaceBetween={100}
                      >
                        {eventReviews.map(item => (
              
              <SwiperSlide className='pt-4 rounded-sm' >
              <motion.div className='border rounded-xl shadow-md text-center p-6 bg-gray-100 w-[350px]' close={closeModel}>
                <h2 className='text-xl font-semibold text-gray-800'>{item.review_event} by {item.reviewer_username}</h2>
                <p className='text-gray-700 py-4'>{item.review_description}</p>
              </motion.div>
              </SwiperSlide>))}
                      
                      
                      </Swiper>
                    </div>
                </div>
            </div>
          
          )
    }
        }



