import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class ShortAnswer extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            response: _.isEmpty(this.props.responses[this.props.question.id]) ? '' : this.props.responses[this.props.question.id]
        };
        this.update = this.update.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.response !== prevState.response) {
            this.update();
        }
    }
    
    update () {
        this.props.actions.update(this.props.question.id, this.state.response);
    }
    
    updateResponse (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }

        this.setState(function (prevState, props) {
            prevState.response = new_val;
            return prevState;
        });
    }

    render () {
        return (
            <FormControl
                type="textarea"
                defaultValue={this.state.response}
                bsClass="form-control"
                onBlur={this.updateResponse}
                onKeyPress={this.updateResponse}
            />
        );
    }
}
