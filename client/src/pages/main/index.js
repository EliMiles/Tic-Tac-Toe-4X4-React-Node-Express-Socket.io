import React, { Component } from 'react'

import AddCommentForm from '../../components/addCommentForm';
import SearchComment from '../../components/searchComment';
import CommentDisplay from '../../components/commentDisplay';

class Main extends Component {
    render() {
        return (
            <div>
                <AddCommentForm />
                <SearchComment />
                <CommentDisplay />
            </div>
        )
    }
}

export default Main;
