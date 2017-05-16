import React, {Component} from 'react';

export default class Survey extends Component {
    render() {
        return (
            <form>
                <div id="question-controls"><a onClick={this.props.addQuestion} className="btn btn-default">+</a></div>
                {this.props.children}
            </form>
        );
    }
    
}
