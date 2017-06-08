import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

export default class Grid extends Component {
    constructor (props) {
        super(props);    
        this.state = {
            question_details : {
                rows: _.isEmpty(this.props.details.rows) 
                    ? [
                        'Row 1'
                    ]
                    : this.props.details.rows,
                columns: _.isEmpty(this.props.details.columns) 
                    ? [
                        'Column 1'
                    ]
                    : this.props.details.columns
            }
        }

        this.update = this.update.bind(this);
        this.updateDetail = this.updateDetail.bind(this);
        this.addDetail = this.addDetail.bind(this);
        this.removeDetail = this.removeDetail.bind(this);
    }

    update () {
        this.props.actions.update(this.state.question_details);
    }

    addDetail (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.question_details[target.dataset.detail].push(new_val);
            return {question_details: prevState.question_details};
        });

        target.value = '';

        this.update();
    }

    updateDetail (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.question_details[target.dataset.detail][target.dataset.detail_index] = new_val;
            return {question_details: prevState.question_details};
        });

        this.update();
    }

    removeDetail (event) {
        const target = event.target;
        this.setState(function(prevState, props) {
            _.pullAt(prevState.question_details[target.dataset.detail], target.value);
            return {question_details: prevState.question_details};
        });
        this.update();
    }

    render () {
        const rows = this.state.question_details.rows.map((row_label, index) => 
            <div key={row_label + index}>
                <label>Row { index + 1} label</label>
                <FormControl
                    data-detail_index={index}
		            data-detail="rows"
                    type="text"
                    name={ 'row-' + index + '-label'}
                    defaultValue={row_label}
                    bsClass="form-control grid-row-label"
		            onBlur={this.updateDetail}
                    onKeyPress={this.updateDetail}
                />
                <Button
                    data-detail="rows"
                    value={index}
                    bsStyle="link"
                    bsClass="btn btn-link link-circle"
                    onClick={this.removeDetail}
                >
                    X
                </Button>
            </div>
        );

        const columns = this.state.question_details.columns.map((column_label, index) => 
            <div key={column_label + index}>
                <label>Column { index + 1} label</label>
                <FormControl
                    data-detail_index={index}
		            data-detail="columns"
                    type="text"
                    name={ 'column-' + index + '-label'}
                    defaultValue={column_label}
                    bsClass="form-control grid-column-label"
		            onBlur={this.updateDetail}
                    onKeyPress={this.updateDetail}
                />
                <Button
                    data-detail="columns"
                    value={index}
                    bsStyle="link"
                    bsClass="btn btn-link link-circle"
                    onClick={this.removeDetail}
                >
                    X
                </Button>
            </div>
        );

        return (
            <div className="options-container">
                {rows}
                <div>
                    <FormControl
                        data-detail="rows"
                        type="text"
                        name="add_row"
                        placeholder="Add Row"
                        bsClass="form-control add-grid"
                        onBlur={this.addDetail}
                        onKeyPress={this.addDetail}
                    />
                </div>
                <legend className="grid-legend"/>
                {columns}
                <div>
                    <FormControl
                        data-detail="columns"
                        type="text"
                        name="add_column"
                        placeholder="Add Column"
                        bsClass="form-control add-grid"
                        onBlur={this.addDetail}
                        onKeyPress={this.addDetail}
                    />
                </div>
            </div>
        );
    }
}
