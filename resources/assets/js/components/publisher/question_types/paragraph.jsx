import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

export default class Paragraph extends Component {
    constructor (props) {
        super(props);    

        const response = _.isEmpty(this.props.responses[this.props.question.id]) ? '' : this.props.responses[this.props.question.id];
        this.state = {
            response: response,
            value: _.isEmpty(response)? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(response, 'html')
        };
        
        this.update = this.update.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange (value: EditorValue) {
        this.setState(function (prevState, props) {
            prevState.value = value;
            return prevState;
        });
    }
    
    updateResponse (event) {
        this.setState(function (prevState, props) {
            prevState.response = this.state.value.toString('html');
            return prevState;
        });
        this.update();
    }

    render () {
        return (
            <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
                onBlur={this.updateResponse}
            />
        );
    }
}
