import React, { useState, useEffect } from 'react';
import '../../../assets/scss/pages/WebRtcHomePage.scss';
import GoodMorning from './static/img/goodMornig.png';
import Noon from './static/img/noon.png';
import Afternoon from './static/img/afternoon.png';
import GoodNight from './static/img/goodnight.png';

const WebRtcHomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchTimeAndSetGreeting = async () => {
      const currentTime = new Date().getHours();

      let greetingMessage = '';
      let imageUrl = '';

      if (currentTime >= 5 && currentTime < 12) {
        greetingMessage = 'Good Morning';
        imageUrl = GoodMorning; // Replace with actual image path
      } else if (currentTime >= 12 && currentTime < 14) {
        greetingMessage = 'Good Noon';
        imageUrl = Noon; // Replace with actual image path
      } else if (currentTime >= 14 && currentTime < 18) {
        greetingMessage = 'Good Afternoon';
        imageUrl = Afternoon; // Replace with actual image path
      } else if (currentTime >= 18 && currentTime < 22) {
        greetingMessage = 'Good Evening';
        imageUrl = '/images/evening.jpg'; // Replace with actual image path
      } else {
        greetingMessage = 'Good Night';
        imageUrl = GoodNight; // Replace with actual image path
      }

      setGreeting(greetingMessage);
      setImage(imageUrl);
    };

    fetchTimeAndSetGreeting();
  }, []);

  return (
    <div className="container">
      <h1 className="greeting">{greeting}</h1>
      {image && <img src={image} alt={greeting} className="greeting-image" />}
    </div>
  );
};

export default WebRtcHomePage;
