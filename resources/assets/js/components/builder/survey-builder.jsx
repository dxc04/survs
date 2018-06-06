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
        this.onUpdateSettings = this.onUpdateSettings.bind(this);
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

    onUpdateSettings (data) {
        this.setState(function(prevState, props) {
            prevState.survey.settings = data.settings;
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
                question: '',
                order: _.maxBy(prevState.survey.questions, 'order')['order'] + 1,
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
            
            value.order = _.size(new_questions) - 1; // zero-base ordering
            new_questions.push(value);
            if (index == key) {
                dup_question.order = _.size(new_questions) - 1; // zero-base ordering
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

    onMoveQuestion (from_order, to_order) {
        const ordered_questions = [];
        const sorted_questions = _.sortBy(this.state.survey.questions, 'order');

        if (to_order > from_order) {
            var before_from_order_count = 0;
            _.forEach(sorted_questions, function(val, index) {
                if (from_order == index) {
                    val.order = to_order;
                }
                else {
                    if (from_order > index) {
                        val.order = index;
                        before_from_order_count++;
                    }
                    else {
                        val.order = (to_order >= index) ? before_from_order_count++ : before_from_order_count++ + 1;
                    }
                }
                ordered_questions.push(val);
            });
        }
        else {
            var before_to_order_count = 0;
            _.forEach(sorted_questions, function(val, index) {
                if (from_order == index) {
                    val.order = to_order;
                }
                else {
                    val.order = (to_order > index) ? before_to_order_count++ : before_to_order_count++ + 1;
                }
                ordered_questions.push(val);
            });
        }

        this.setState(function(prevState, props) {
            prevState.survey.questions = ordered_questions;
            return {survey: prevState.survey};
        });

        this.save();
    }

    onUpdateQuestionType (id, value) {
        const question = _.find(prevState.survey.questions, ['id', id]);
        this.setState(function(prevState, props) {
            question.type = value;
            return {survey: prevState.survey};
        });
    }

    buildQuestions () {
        const sorted = _.sortBy(this.state.survey.questions, 'order'); 
        return sorted.map((question, index) => 
            <Question 
                key={question.id}
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
            <Survey
                settings={this.props.survey.settings}
                actions={
                    {addQuestion: this.onAddQuestion},
                    {updateSettings: this.onUpdateSettings}
                } 
            >
                <Information title={this.props.survey.title} description={this.props.survey.description} actions={{ update: this.onUpdate}}/>
                <div id="survey-questions">
                    {children}
                </div>
            </Survey>
        );
    }
    
}
