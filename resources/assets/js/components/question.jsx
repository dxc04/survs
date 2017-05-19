import React, {Component} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import MultipleChoice from './question_types/multiple-choice';

export default class Question extends Component {
    constructor(props) {
        super(props);

        this.questionTemplate = this.questionTemplate.bind(this);
        this.remove = this.remove.bind(this);
        this.duplicate = this.duplicate.bind(this);
        this.active = this.active.bind(this);
        this.updateType = this.updateType.bind(this);
    }

    duplicate () {
        this.props.actions.duplicate(this.props.id);
    }

    remove () {
        this.props.actions.remove(this.props.id);
    }

    active () {
        this.props.actions.active(this.props.id);    
    }

    updateType (event) {
        const target = event.target;
        this.props.actions.updateType(this.props.id, target.value);    
    } 

    questionTemplate(question) {
        switch (question.type) {
            case 'multiple_choice' :
                return <MultipleChoice 
                            options={_.isEmpty(question.details.options) ? [] : question.details.options}
                        />; 
            case 'checkboxes' :
                return; 
            case 'short_answer' :
                return; 
            case 'paragraph' :
                return;
            default :
                return <MultipleChoice 
                            options={_.isEmpty(question.details.options) ? [] : question.details.options}
                        />; 
        }
    }

    selectQuestionType (event) {
        
    }

    render () {
        const panel_class = 'panel panel-default ' + (this.props.question.active ? 'panel-active' : ''); 
        return (
            <div className={panel_class} onClick={this.active}>
                <div className="panel-body">
                    <FormControl
                        type="text"
                        name="question"
                        placeholder="Question"
                        className="input-title-lg"
                    />
                    {this.questionTemplate(this.props.question)}
                </div>
                <div className="panel-footer">
                        <div className="row">
                            <div className="col-md-4">
                                <ButtonToolbar>
                                    <Button bsStyle="default" bsSize="small" onClick={this.duplicate}>
                                        <i className="fa fa-files-o"></i>
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
