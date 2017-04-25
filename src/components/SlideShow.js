import React from 'react';
import '../css/Home.css';
import { Carousel } from 'react-bootstrap'

const SlideShow = () => {
	return (
	<div>
		<Carousel>
			<Carousel.Item>
				<img className="slide_show" role="presentation" src={require('../images/view01.jpg')}/>
				<Carousel.Caption>
					<h1>TRIPS BLOG</h1>
					<h3>มาร่วมแบ่งปันประสบการณ์การท่องเที่ยวในแบบต่างๆกับเรา</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="slide_show" role="presentation" src={require('../images/view02.jpg')}/>
				<Carousel.Caption>
					<h1>TRIPS SEARCH</h1>
					<h3>ค้นหาไอเดียในการจัดทริปสนุกๆมากมาย</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="slide_show" role="presentation" src={require('../images/view03.jpg')}/>
				<Carousel.Caption>
					<h1>SHARE YOUR TRIP</h1>
					<h3>แบ่งปันทริปสนุกๆของคุณให้กับเพื่อนๆ</h3>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	</div>
	)
}

export default SlideShow
//<img className="slide_show" src={require('../images/view01.jpg')}/>
