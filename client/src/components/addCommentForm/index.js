import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../pages/main/actions';

import './style.css';

class AddCommentForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            email:'',
            comment:'',
            rating: 0
        }
    }

    changeHandler = (e) => {

        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        
        //e.preventDefault()
        
        this.props.addComment(this.state); // call to addComment function in actions/index.js

        this.setState({
            email:'',
            comment:'',
            rating: 0
        })
    }

    render() {

        const { email, comment, rating } = this.state

        return (
            <div className="App_content AddCommentForm_content">
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="formComment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            placeholder="Add your comment"
                            name="comment"
                            value={comment}
                            onChange={this.changeHandler}
                        />
                    </Form.Group>

                    <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" name="rating" value={rating} onChange={this.changeHandler} >
                            <option hidden value={0}>Pick 1-5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default connect(null, actions)(AddCommentForm);