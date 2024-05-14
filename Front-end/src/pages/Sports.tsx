import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel } from 'react-bootstrap';
import josh from '../assests/joshallen.png';
import kc from '../assests/kc.png';
import baseball from '../assests/baseball.png';
import EventAccordion from "./EventAccordion";

import eric from "../assests/eric.png";
import backinback from "../assests/backinback.png";
import almostqueen from "../assests/almostqueen.png";
import gunna from "../assests/gunna.png";



export function Sports(){

    type Event = {
        id: number;
        name: string;
        date: string;
        location: string;
        imageUrl: string;
    };
    const handleEventClick = (event: Event) => {
        // Handle the click event, e.g., navigate to a specific event page
        console.log('Event clicked:', event);
    };
    // Data for accordion
    const SportsEvents = [{
        title: 'Eric Bellinger',
        description: 'Eric Aldwin Bellinger Jr. is an American singer and songwriter. He began songwriting in 2010, and his co-writing credits including "Lemme See" by Usher, "New Flame" by Chris Brown, "You Don\'t Know" by Tank, "Right Here" by Justin Bieber, and "Disrespectful" by Trey Songz.',
        image: eric,
        ticketLink: '#',
        time:'Last updated 3 mins ago'
    },{
        title: 'Back In Black',
        description: 'Back in Black is the seventh studio album by Australian rock band AC/DC, released by Albert Productions and Atlantic Records on 25 July 1980. It was the band\'s first album to feature Brian Johnson as lead singer, following the death of Bon Scott, their previous vocalist.',
        image: backinback,
        ticketLink: '#',
        time:'Last updated 2 mins ago'

    },{
        title: 'Almost Queen',
        description: 'Almost Queen four piece band is "guaranteed to blow your mind" with iconic four-part harmonies and expertly executed musical interludes. Almost Queen\'s. while their live energy and precision will leave music fans of all ages with an unforgettable concert experience',
        image: almostqueen,
        ticketLink: '#',
        time:'Last updated 50 mins ago'

    },{
        title: 'Gunna',
        description: 'Gunna released his debut studio album, Drip or Drown 2, in 2019 and followed it up with his second studio album Wunna in 2020, which debuted atop the Billboard 200.[9] In August 2020, he was featured on Internet Money\'s single "Lemonade" which peaked at number six on the Billboard.',
        image: gunna,
        ticketLink: '#',
        time:'Last updated 5 hours ago'

    }];
    return (
        <>
            <Carousel>
                <Carousel.Item onClick={() => handleEventClick({ id: 1, name: 'Event 1', date: 'DD/MM/YYYY', location: 'Venue Name, City, State', imageUrl: 'event1.jpg' })}>
                    <img
                        className="d-block w-100"
                        src={josh}
                        alt="Taylor Event"
                        width={900}
                        height={660}
                    />
                    <Carousel.Caption>
                        <h3>Football</h3>
                        <p>Date: 05/12/2024</p>
                        <p>Location: MVP Arena, Albany, Newyork</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={kc}
                        alt="Event 2"
                        width={900}
                        height={660}
                    />
                    <Carousel.Caption>
                        <h3>NFL</h3>
                        <p>Date: 07/26/2024</p>
                        <p>Location: San Francisco, California</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={baseball}
                        alt="Event 1"
                        width={900}
                        height={660}
                    />
                    <Carousel.Caption>
                        <h3>BASE BALL</h3>
                        <p>Date: 07/29/2024</p>
                        <p>Location: Arlington, Texas</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <EventAccordion events={SportsEvents}/>

        </>
    )
}