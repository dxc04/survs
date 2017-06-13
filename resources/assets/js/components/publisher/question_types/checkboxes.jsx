import React, { Component } from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';

export default class Checkboxes extends Component {
    constructor (props) {
        super(props);
        this.state = {
            response : _.isEmpty(this.props.responses[this.props.question.id])
                ? [] : this.props.responses[this.props.question.id]
        }

        this.update = this.update.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
    }

    update () {
        this.props.actions.update(this.props.question.id, this.state.response);
    }

    updateResponse (event) {
        const target = event.target;
        const new_val = target.value;

        this.setState(function(prevState, props) {
            if (target.checked) {
                prevState.response.push(new_val);
            } else {
                _.pullAt(prevState.response, new_val);
            }
            return prevState;
        });
        this.update();
    }

    render () {
        const question = this.props.question;
        const options = question.details.options.map((label, index) => 
            <Checkbox
                key={label + index}
                defaultChecked={_.includes(this.state.response, _.toString(index)) ? true : false}
                onChange={this.updateResponse}
                value={index}
            >
                <span>{label}</span>
            </Checkbox>
        );
        return (
            <div id={question.id}>
                {options}
            </div>
        );
    }
}
