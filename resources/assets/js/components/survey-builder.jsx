import React, {Component} from "react";
import ReactDOM from "react-dom";
import Survey from "./survey.jsx";
import Information from "./information.jsx";
import Question from "./question.jsx";

export default class SurveyBuilder extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            survey: this.props.survey
        };

        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onDuplicateQuestion = this.onDuplicateQuestion.bind(this);
        this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
        this.onActiveQuestion = this.onActiveQuestion.bind(this);
        this.onUpdateQuestionType = this.onUpdateQuestionType.bind(this);
    }

    onAddQuestion () {
        const new_id = _.uniqueId('new_question_');
        this.setState(function(prevState, props) {
            prevState.survey.questions.push({
                id: new_id,
                type: 'multiple_choice',
                active: true,
                details: {
                    options: [
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]        
                }
            });
            return {questions: prevState.survey.questions};
        });

        this.onActiveQuestion(new_id);
    }

    onRemoveQuestion (id) {
        this.setState(function(prevState, props) {
            return {
                questions: _.remove(prevState.survey.questions, (n) => {
                    return id != n.id;    
                })
            };
        });
    }

    onDuplicateQuestion (id) {
        const question = _.find(this.state.survey.questions, ['id', id]);
        const index = _.findIndex(this.state.survey.questions, ['id', id]) + 1;
        const dup_question = _.clone(question);
        dup_question.id = _.uniqueId('new_question_');

        this.setState(function(prevState, props) {
            const questions = prevState.survey.questions;
            questions.splice(index, 0, dup_question);

            return {questions: questions};
        });

        this.onActiveQuestion(dup_question.id);
    }

    onActiveQuestion (id) {
        this.setState(function(prevState, props) {
            _.each(prevState.survey.questions, (value, key) => {
                prevState.survey.questions[key].active = (value.id == id);   
            });
            
            return {questions: prevState.survey.questions};
        });
    }

    onUpdateQuestionType (id, value) {
        this.setState(function(prevState, props) {
            const question = _.find(prevState.survey.questions, ['id', id]);
            question.type = value;
            return {questions: prevState.survey.questions};
        });
    }

    buildQuestions () {
        return this.state.survey.questions.map((question, index) => 
            <Question 
                key={question.id}
                id={question.id}
                label={'Q'+(index+1)}
                actions={{
                    remove: this.onRemoveQuestion,
                    duplicate: this.onDuplicateQuestion,
                    active: this.onActiveQuestion,
                    updateType: this.onUpdateQuestionType
                }}
                question={question}
                question_types = {this.props.survey.question_types}
            />
        );
    }

    render () {
        const children = this.buildQuestions();
        return (
            <Survey title={this.props.survey.title} description={this.props.survey.description} addQuestion={this.onAddQuestion}>
                <Information />
                {children}
            </Survey>
        );
    }
    
}
