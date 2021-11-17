import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "bootstrap/dist/css/bootstrap.min.css";

function Grid() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>hola</Col>
                    <Col>hola</Col>
                    <Col>hola</Col>
                </Row>

                <Row>
                    <Col>hola</Col>
                    <Col>hola</Col>
                    <Col>hola</Col>
                </Row>

                <Row>
                    <Col>hola</Col>
                    <Col>hola</Col>
                    <Col>hola</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Grid
