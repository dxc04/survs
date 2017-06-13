import React, { Component } from 'react';
import Radio from 'react-bootstrap/lib/Radio';

export default class MultipleChoice extends Component {
    constructor (props) {
        super(props);
        this.state = {
            response : _.isEmpty(this.props.responses[this.props.question.id])
                ? {} : this.props.responses[this.props.question.id]
        }

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

        this.setState(function(prevState, props) {
            prevState.response = new_val;
            return prevState;
        });
    }

    render () {
        const question = this.props.question;
        const options = question.details.options.map((label, index) => 
            <Radio
                name={question.id}
                key={label + index}
                onClick={this.updateResponse}
                value={index}
                defaultChecked={this.state.response == index ? true : false}
            >
                <span>{label}</span>
            </Radio>
        );
        return (
            <div id={question.id}>
                {options}
            </div>
        );
    }
}
