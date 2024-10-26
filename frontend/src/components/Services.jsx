import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import {  FaCarAlt,  FaCheckDouble, FaGifts, FaThumbsUp, FaTicketAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const Services = () => {
    const serviceData = [
        {
          id: 1,
          title: "Accessible",
          icon:<FaCarAlt/>,
          desc: "Tempor tempor sadipscing vero lorem sea, invidunt sed et eos ipsum et erat. Dolor ut duo sadipscing lorem. Gubergren gub",
        },
      
        {
          id: 2,
          title: "Secure",
         icon:<FaCheckDouble/>,
          desc: "Tempor tempor sadipscing vero lorem sea, invidunt sed et eos ipsum et erat. Dolor ut duo sadipscing lorem. Gubergren gub",
        },
      
        {
          id: 3,
          title: "Convenient",
          icon:<FaThumbsUp/>,
          desc: "Tempor tempor sadipscing vero lorem sea, invidunt sed et eos ipsum et erat. Dolor ut duo sadipscing lorem. Gubergren gub",
        },
      
        {
          id: 4,
          title: "Fast & Easy Online Booking",
          icon: <FaTicketAlt/>,
          desc: "Tempor tempor sadipscing vero lorem sea, invidunt sed et eos ipsum et erat. Dolor ut duo sadipscing lorem. Gubergren gub",
        },
      
        {
          id: 5,
          title: "Many Pickup Locations",
          icon: <FaLocationDot/>,
          desc: "Tempor tempor sadipscing vero lorem sea, invidunt sed et eos ipsum et erat. Dolor ut duo sadipscing lorem. Gubergren gub",
        },
      
        {
          id: 6,
          title: "Best Offers",
          icon: <FaGifts/>,
          desc: "Tempor tempor sadipscing vero lorem sea, invidunt sed et eos ipsum et erat. Dolor ut duo sadipscing lorem. Gubergren gub",
        },  
      ];
          
  return (
    <Container className='mt-5'>
        <h1 className='text-center'>Our Services</h1>
        <hr/>
       <Row>
      {serviceData.map((item,i) => (
       <Col  key={i} lg="4" md="4" sm="6" className="mb-3">
        <Card>
            <Card.Body>
               <span className='mb-5 text-warning fs-2 p-1'>{item.icon}</span>
                <h5 className='fw-bold'>{item.title}</h5>
                <p>{item.desc}</p>
            </Card.Body>
        </Card>
     </Col>
      ))}
    </Row>
    </Container>
  )
}

export default Services