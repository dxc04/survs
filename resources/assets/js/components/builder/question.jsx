import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import MultipleChoice from './question_types/multiple-choice';
import TrueOrFalse from './question_types/true-or-false';
import ShortAnswer from './question_types/short-answer';
import Paragraph from './question_types/paragraph';

export default class Question extends Component {
    constructor (props) {
        super(props);

        this.state = {
            question: this.props.question
        }

        this.template = this.template.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.duplicate = this.duplicate.bind(this);
        this.active = this.active.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDetails = this.updateDetails.bind(this);
        this.updateType = this.updateType.bind(this);
    }

    update () {
        this.props.actions.update(this.props.id, this.state.question);
    }

    duplicate () {
        this.props.actions.duplicate(this.props.id);
    }

    remove () {
        this.props.actions.remove(this.props.id);
    }

    active (event) {
        if (event.target.dataset.duplicate) {
           return null;    
        }
        this.props.actions.active(this.props.id);    
    }

    updateType (event) {
        const target = event.target;
        this.setState(function(prevState, props) {
            prevState.question.type = target.value;
            return {question: prevState.question};
        });

        this.update();
    } 

    updateTitle (event) {
        const target = event.target;

        if ((event.type == 'blur' && _.isEmpty(target.value)) || (event.type == 'keypress' && event.charCode != 13)) {
            return null;
        }

        this.setState(function(prevState, props) {
            prevState.question.question = target.value;
            return {question: prevState.question};
        });

        this.update();
    }

    updateDetails (question_details) {
        this.setState(function(prevState, props) {
            prevState.question.details = question_details;
            return {question: prevState.question};
        });

        this.update();
    }

    template () {
        var question = this.props.question;
        switch (question.type) {
            case 'multiple_choice' :
                return <MultipleChoice details={question.details} actions={{update: this.updateDetails}}/>; 
            case 'checkboxes' :
                return; 
            case 'true_or_false' : 
                return <TrueOrFalse details={{}} actions={{update: this.updateDetails}} />;
            case 'short_answer' :
                return <ShortAnswer />; 
            case 'paragraph' :
                return <Paragraph />;
            default :
                return <MultipleChoice details={question.details} actions={{update: this.updateDetails}}/>; 
        }
    }

    render () {
        const panel_class = 'panel panel-default ' + (this.props.question.active ? 'panel-active' : ''); 
        return (
            <div ref={this.props.question.id} className={panel_class} onClick={this.active}>
                <div className="panel-body">
                    <div className="pull-right question-number">{this.props.label}</div>
                    <FormControl
                        type="text"
                        name="question"
                        placeholder="Question"
                        className="input-title-lg"
                        defaultValue={this.state.question.question}
                        onBlur={this.updateTitle}
                        onKeyPress={this.updateTitle}
                    />
                    <br />
                    {this.template()}
                </div>
                <div className="panel-footer">
                        <div className="row">
                            <div className="col-md-4">
                                <ButtonToolbar>
                                    <Button bsStyle="default" data-duplicate bsSize="small" onClick={this.duplicate}>
                                        <i data-duplicate className="fa fa-files-o duplicate-ctrl"></i>
                                    </Button>
                                    <Button bsStyle="default" bsSize="small" onClick={this.remove}>
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </ButtonToolbar>
                            </div>
                            <div className="col-md-4 col-md-offset-4">
                                <div className="row">
                                    <div className="col-md-8">
                                        <FormControl componentClass="select" placeholder="Question Type" onChange={this.updateType}>
                                            {_.map(this.props.question_types, (t,i) => <option key={i} value={i}>{t}</option>)}
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <Checkbox>
                                            Required
                                        </Checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        );          
    }

}
