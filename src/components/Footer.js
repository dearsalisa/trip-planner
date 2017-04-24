import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router'
import { Row, Col, Grid } from 'react-bootstrap'

const Footer = () => {
	return (
    <div className="footer">
      <Grid>
        <Row>
          <Col xs={4} md={4}>
            <p>จัดทำโดย</p>
            <p>นางสาว ศลิษา อติวัฒนชัย 5610500061</p>
          </Col>
          <Col xs={4} md={4}>
            <p>อาจารย์ที่ปรึกษา</p>
            <p>ผศ.ดร.ธนาวินท์ รักธรรมานนท์</p>
          </Col>
          <Col xs={4} md={4}>
            <p>คณะวิศวกรรมศาสตร์ ภาควิชาวิศวกรรมคอมพิวเตอร์</p>
            <p>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต บางเขน</p>
          </Col>
        </Row>
      </Grid>
    </div>
	)
}

export default Footer
