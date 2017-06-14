import React, { Component } from 'react';
import Radio from 'react-bootstrap/lib/Radio';

export default class Scale extends Component {
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
        const details_range = question.details.range;
        const options = _.map(_.range(details_range.min.value, (details_range.max.value + 1)), (t,i) => 
            <div key={t + i} className="col-sm-1">
                <Radio
                    name={question.id}
                    onClick={this.updateResponse}
                    value={t}
                    defaultChecked={this.state.response == t ? true : false}
                ></Radio>
            </div>
        );

        const labels = _.map(_.range(details_range.min.value, (details_range.max.value + 1)), (t,i) => 
            <div key={t + i} className="col-sm-1">
                <span>{t}</span>
            </div>
        );
        
        return (
            <div id={question.id} className="question-container">
                <div className="row publish-row">
                    <div className="col-sm-1"></div>
                    {labels}
                </div>
                <div className="row publish-row">
                    <div className="col-sm-1 publish-row-label"><label>{details_range.min.label}</label></div>
                        {options}
                    <div className="col-sm-1 publish-row-label"><label>{details_range.max.label}</label></div>
                </div>
            </div>
        );
    }
}
