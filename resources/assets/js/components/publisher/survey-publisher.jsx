import React, {Component} from "react";
import Button from 'react-bootstrap/lib/Button';

import MultipleChoice from './question_types/multiple-choice';
import Checkboxes from './question_types/checkboxes';
import ShortAnswer from './question_types/short-answer';
import Paragraph from './question_types/paragraph';
import Scale from './question_types/scale';
import Grid from './question_types/grid';

export default class SurveyPublisher extends Component {
    constructor (props) {
        super(props);
        this.pages = _.chunk(this.props.survey.questions, this.props.survey.settings.questions_per_page);
        const page_number = 0;
        
        this.state = {
            current_page: this.pages[page_number],
            current_page_num: page_number,
            responses: {} 
        };

        this.details = this.details.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.updateResponses = this.updateResponses.bind(this);
    }

    details (question) {
        switch (question.type) {
            case 'multiple_choice' :
            case 'true_or_false' : 
                return <MultipleChoice question={question} responses={this.state.responses} actions={{update: this.updateResponses}}/>; 
            case 'checkboxes' :
                return <Checkboxes question={question} responses={this.state.responses} actions={{update: this.updateResponses}}/>; 
            case 'short_answer' :
                return <ShortAnswer question={question} responses={this.state.responses} actions={{update: this.updateResponses}}/>; 
            case 'paragraph' :
                return <Paragraph question={question} responses={this.state.responses} actions={{update: this.updateResponses}}/>; 
            case 'scale' :
                return <Scale question={question} responses={this.state.responses} actions={{update: this.updateResponses}}/>; 
            case 'grid' :
                return <Grid question={question} responses={this.state.responses} actions={{update: this.updateResponses}}/>; 
            default :
                return '';
        }
    }

    controls () {
        if (_.size(this.pages) == this.state.current_page_num + 1){
            return (
                <div>
                    <Button bsStyle="default" data-action="prev" onClick={this.onChangePage}>Previous</Button>
                    <Button bsStyle="default">Submit</Button>
                </div>
            );
        } else if (this.state.current_page_num > 0) {
            return (
                <div>
                    <Button bsStyle="default" data-action="prev" onClick={this.onChangePage}>Previous</Button>
                    <Button bsStyle="default" data-action="next" onClick={this.onChangePage}>Next</Button>
                </div>
            );
        } else {
            return (<Button bsStyle="default" data-action="next" onClick={this.onChangePage}>Next</Button>);
        }
    }

    onChangePage (event) {
        const target = event.target;
        const add = target.dataset.action == 'prev' ? -1 : 1;

        this.setState(function (prevState, props) {
            prevState.current_page_num = prevState.current_page_num + add;
            prevState.current_page = this.pages[prevState.current_page_num];

            return prevState;
        });
    }

    updateResponses (question_id, response) {
        this.setState(function (prevState, props) {
            prevState.responses[question_id] = response;
            return prevState;
        });
        console.log(this.state.responses);
    }

    render () {
        const children = this.state.current_page.map((question, index) =>
            <div key={question.id} id="survey-questions" className="panel panel-default">
                <div className="panel-body">
                    <div className="pull-right question-number">{'Q' + (question.order + 1)}</div>

                    <div className="survey-question">{question.question}</div>
                    {this.details(question)}
                </div>
            </div>                
        );

        return (
            <form>
                <div className="input-title-lg">{this.props.survey.title}</div>
                <div>{this.props.survey.description}</div>
                {children}
                {this.controls()}
            </form>
        );
    }
}

