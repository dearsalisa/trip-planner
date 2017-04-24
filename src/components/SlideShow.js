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
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="slide_show" role="presentation" src={require('../images/view02.jpg')}/>
				<Carousel.Caption>
				<h3>Second slide label</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="slide_show" role="presentation" src={require('../images/view03.jpg')}/>
				<Carousel.Caption>
				<h3>Third slide label</h3>
				<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	</div>
	)
}

export default SlideShow
//<img className="slide_show" src={require('../images/view01.jpg')}/>
