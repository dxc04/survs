import React, {Component} from 'react';

export default class Survey extends Component {
    constructor(props) {
        super(props);    

    }

    render() {
        return (
            <form>
                <div id="question-controls"><a onClick={this.props.addQuestion} className="btn btn-primary btn-circle btn-lg">+</a></div>
                {this.props.children}
            </form>
        );
    }
    
}
