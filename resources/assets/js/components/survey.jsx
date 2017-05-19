import React, {Component} from 'react';

export default class Survey extends Component {
    constructor (props) {
        super(props);    

    }

    render () {
        return (
            <form>
                <div className="main-controls">
                    <a onClick={this.props.addQuestion} className="btn btn-success btn-circle btn-lg" title="Add Question">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    <a className="btn btn-info btn-circle btn-lg" title="Preview">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    </a>
                    <a className="btn btn-primary btn-circle btn-lg" title="Save">
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </a>
                </div>
                {this.props.children}
            </form>
        );
    }
    
}
