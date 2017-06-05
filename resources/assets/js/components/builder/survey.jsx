import React, {Component} from 'react';

export default class Survey extends Component {
    constructor (props) {
        super(props);    

        this.addQuestion = this.addQuestion.bind(this); 
    }

    componentDidMount() {
        this.$btn = $(this.addBtn);
        this.$btn.tooltip({
            content: 'Click to add new question.',
            placement: 'left'
        });
        this.$btn.tooltip('show');
    }

    addQuestion() {
        this.props.actions.addQuestion();
        this.$btn.tooltip('destroy');
    }

    render () {
        return (
            <form>
                <div className="main-controls">
                    <a ref={addBtn => this.addBtn = addBtn} onClick={this.addQuestion} className="btn btn-success btn-circle btn-lg" title="Add Question">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    <a className="btn btn-info btn-circle btn-lg" title="Preview">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    </a>
                    <a className="btn btn-primary btn-circle btn-lg" title="Publish and Administer">
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </a>
                </div>
                {this.props.children}
            </form>
        );
    }
    
}
