import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';

const Kvitter = ({ data }) => {
  return (
    <Container>
      {
        data.map(kvitt => (
          <Row key={kvitt.idpos}>
            <Col sm={12}>
              <Media>
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src="holder.js/64x64"
                  alt="PH"
                />
                <Media.Body>
                  <h5>{kvitt.handle}</h5>
                  <p>
                    {kvitt.message}
                  </p>
                </Media.Body>
              </Media>
            </Col>
          </Row>
        ))
      }
    </Container>
  );
};

export default Kvitter;
