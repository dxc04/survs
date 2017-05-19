import React, {Component} from "react";
import ReactDOM from "react-dom";
import Survey from "./survey.jsx";
import Information from "./information.jsx";
import Question from "./question.jsx";

export default class SurveyBuilder extends Component {
    constructor(props) {
        super(props);    

        this.state = {
            questions: _.isEmpty(this.props.questions) ? [] : this.props.questions
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
            prevState.questions.push({
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
            return {questions: prevState.questions};
        });

        this.onActiveQuestion(new_id);
    }

    onRemoveQuestion (id) {
        this.setState(function(prevState, props) {
            return {
                questions: _.remove(prevState.questions, (n) => {
                    return id != n.id;    
                })
            };
        });
    }

    onDuplicateQuestion (id) {
        const question = _.find(this.state.questions, ['id', id]);
        const index = _.findIndex(this.state.questions, ['id', id]) + 1;
        const dup_question = _.clone(question);
        dup_question.id = _.uniqueId('new_question_');

        this.setState(function(prevState, props) {
            const questions = prevState.questions;
            questions.splice(index, 0, dup_question);

            return {questions: questions};
        });

        this.onActiveQuestion(dup_question.id);
    }

    onActiveQuestion (id) {
        this.setState(function(prevState, props) {
            _.each(prevState.questions, (value, key) => {
                prevState.questions[key].active = (value.id == id);   
            });
            
            return {questions: prevState.questions};
        });
    }

    onUpdateQuestionType (id, value) {
        this.setState(function(prevState, props) {
            const question = _.find(prevState.questions, ['id', id]);
            question.type = value;
            return {questions: prevState.questions};
        });
    }

    buildQuestions () {
        return this.state.questions.map((question) => 
            <Question 
                key={question.id}
                id={question.id}
                actions={{
                    remove: this.onRemoveQuestion,
                    duplicate: this.onDuplicateQuestion,
                    active: this.onActiveQuestion,
                    updateType: this.onUpdateQuestionType
                }}
                question={question}
                question_types = {this.props.question_types}
            />
        );
    }

    render() {
        const children = this.buildQuestions();
        return (
            <Survey addQuestion={this.onAddQuestion}>
                <Information />
                {children}
            </Survey>
        );
    }
    
}
