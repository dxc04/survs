import React, {Component} from "react";
import ReactDOM from "react-dom";
import Survey from "./survey.jsx";
import Information from "./information.jsx";
import Question from "./question.jsx";

export default class SurveyBuilder extends Component {
    constructor(props) {
        super(props);    

        this.state = {
            questions: []
        };

        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onDuplicateQuestion = this.onDuplicateQuestion.bind(this);
        this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
    }

    onAddQuestion () {
        this.setState(function(prevState, props) {
            prevState.questions.push({
                id: _.uniqueId('new_question_'),
                type: 'multiple_choice',
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

    buildQuestions () {
        return this.state.questions.map((question) => 
            <Question 
                key={question.id}
                id={question.id}
                actions={{remove: this.onRemoveQuestion, duplicate: this.onDuplicateQuestion }}
                question={question}
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
