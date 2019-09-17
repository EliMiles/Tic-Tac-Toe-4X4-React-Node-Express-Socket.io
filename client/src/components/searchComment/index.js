import React, { Component } from 'react';
import { Form , InputGroup} from 'react-bootstrap';
import { MdSearch } from "react-icons/md";
import { connect } from 'react-redux';
import * as actions from '../../pages/main/actions';

import './style.css';

class SearchComment extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchInput:''
        }
    }

    changeHandler = (e) => {

        this.setState({[e.target.name]:e.target.value})
        
        this.props.filterComments(e.target.value); // call to filterComments function in actions/index.js
    }

    render() {

        return (
            <div className="App_content SearchComment_content">
                <Form noValidate>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text><MdSearch /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            className="searchInput"
                            name="searchInput"
                            value={this.state.searchInput}
                            type="text"
                            placeholder="Filter"
                            aria-describedby="inputGroupPrepend"
                            onChange={this.changeHandler}
                        />
                    </InputGroup>
                </Form>
            </div>
        );
    }
};

export default connect(null,actions)(SearchComment);