import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default class Question extends Component {
    constructor(props) {
        super(props);

    }

    render () {
        return (
            <div className="panel panel-default" id="question-{this.props.id}">
                <div className="panel-body">
                    <FormControl
                        type="text"
                        name="question"
                        placeholder="Question"
                        className="input-title-lg"
                    />
                </div>
                <div className="panel-footer">
                        <a className="btn btn-default btn-sm" href="#" role="button">
                            <i className="fa fa-files-o"></i>
                        </a>
                        <a className="btn btn-default btn-sm" href="#" role="button">
                            <i className="fa fa-trash"></i>
                        </a>
                </div>
            </div>
        );          
    }

}
