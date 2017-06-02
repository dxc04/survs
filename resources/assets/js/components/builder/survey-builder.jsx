import React, {Component} from "react";
import ReactDOM from "react-dom";
import Survey from "./survey.jsx";
import Information from "./information.jsx";
import Question from "./question.jsx";

import SurveyApi from '../../survey-api.jsx';

export default class SurveyBuilder extends Component {
    constructor (props) {
        super(props);    

        this.api = new SurveyApi();

        this.state = {
            survey: this.props.survey
        };

        this.save = this.save.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onUpdateQuestion = this.onUpdateQuestion.bind(this);
        this.onDuplicateQuestion = this.onDuplicateQuestion.bind(this);
        this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
        this.onActiveQuestion = this.onActiveQuestion.bind(this);
        this.onMoveQuestion = this.onMoveQuestion.bind(this);
        this.onUpdateQuestionType = this.onUpdateQuestionType.bind(this);
    }

    save () {
        this.api.save(this.state.survey);
    }

    onUpdate (data) {
        this.setState(function(prevState, props) {
            prevState.survey.title = data.title;
            prevState.survey.description = data.description;
            return {survey: prevState.survey};
        });

        this.save();
    }

    onAddQuestion () {
        const new_id = _.uniqueId('new_question_');
        this.setState(function(prevState, props) {
            prevState.survey.questions.push({
                id: new_id,
                type: 'multiple_choice',
                order: _.size(prevState.survey.questions),
                question: '',
                is_required: false,
                details: {
                    options: [
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]        
                }
            });
            return {survey: prevState.survey};
        });

        this.onActiveQuestion(new_id);

        this.save();
    }

    onUpdateQuestion (id, question) {
        const index = _.findIndex(this.state.survey.questions, ['id', id]);
        this.setState(function(prevState, props) {
            prevState.survey.questions[index] = question;
            return {survey : prevState.survey};
        });       

        this.save();
    }

    onRemoveQuestion (id) {
        this.setState(function(prevState, props) {
            const questions = _.remove(prevState.survey.questions, (n) => {
                return id != n.id;    
            });
            prevState.survey.questions = questions;
            return {survey : prevState.survey};
        });

        this.save();
    }

    onDuplicateQuestion (id) {
        const question = _.find(this.state.survey.questions, ['id', id]);
        const index = _.findIndex(this.state.survey.questions, ['id', id]);
        const dup_question = _.clone(question);
        dup_question.id = _.uniqueId('new_question_');

        const new_questions = [];
        _.forEach(this.state.survey.questions, function(value, key) {
            
            value.order = _.size(new_questions) + 1; // none zero-base ordering
            new_questions.push(value);
                console.log(key, index);
            if (index == key) {
                dup_question.order = _.size(new_questions) + 1; // none zero-base ordering
                new_questions.push(dup_question);
            }
        });


        this.setState(function(prevState, props) {
            prevState.survey.questions = new_questions;
            return {survey: prevState.survey};
        });

        this.onActiveQuestion(dup_question.id);

        this.save();
    }

    onActiveQuestion (id) {
        this.setState(function(prevState, props) {
            prevState.survey.active_question = id;
            return {survey: prevState.survey};
        });
    }

    onMoveQuestion (id, move_to_index) {
        const index = _.findIndex(this.state.survey.questions, ['id', id]);
        const question = _.find(this.state.survey.questions, ['id', id]);
        const new_questions = [];

        _.forEach(this.state.survey.questions, function(value, key) {
            if (key == move_to_index) {
                question.order = _.size(new_questions) + 1; // none zero-base ordering
                new_questions.push(question);
            }
            
            if (index != key) {
                value.order = _.size(new_questions) + 1; // none zero-base ordering
                new_questions.push(value);
            }
        });

        this.setState(function(prevState, props) {
            prevState.survey.questions = new_questions;
            return {survey: prevState.survey};
        });

        console.log(this.state.survey);
    }

    onUpdateQuestionType (id, value) {
        const question = _.find(prevState.survey.questions, ['id', id]);
        this.setState(function(prevState, props) {
            question.type = value;
            return {survey: prevState.survey};
        });
    }

    buildQuestions () {
        return this.state.survey.questions.map((question, index) => 
            <Question 
                key={index}
                id={question.id}
                num={index}
                actions={{
                    remove: this.onRemoveQuestion,
                    duplicate: this.onDuplicateQuestion,
                    active: this.onActiveQuestion,
                    update: this.onUpdateQuestion,
                    move: this.onMoveQuestion
                }}
                question={question}
                question_types={this.props.question_types}
                num_questions={_.size(this.props.survey.questions)}
                is_active={this.state.survey.active_question == question.id}
            />
        );
    }

    render () {
        const children = this.buildQuestions();
        return (
            <Survey actions={{addQuestion: this.onAddQuestion}} >
                <Information title={this.props.survey.title} description={this.props.survey.description} actions={{ update: this.onUpdate}}/>
                <div id="survey-questions">
                    {children}
                </div>
            </Survey>
        );
    }
    
}
