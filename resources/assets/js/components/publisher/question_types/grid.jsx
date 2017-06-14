import React, { Component } from 'react';
import Radio from 'react-bootstrap/lib/Radio';

export default class Grid extends Component {
    constructor (props) {
        super(props);
        this.state = {
            response : _.isEmpty(this.props.responses[this.props.question.id])
                ? [] : this.props.responses[this.props.question.id]
        }

        this.update = this.update.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    update () {
        this.props.actions.update(this.props.question.id, this.state.response);
    }

    updateResponse (event) {
        const target = event.target;
        const row_val = target.dataset.row;
        const col_val = target.dataset.col

        this.setState(function(prevState, props) {
            prevState.response[target.name] = {'row' : row_val, 'col' : col_val};
            return prevState;
        });
        this.update();
    }

    isSelected(row_index, value) {
        if ((! _.isEmpty(this.state.response[row_index])) && this.state.response[row_index].col == value[1]) {
            return true;
        }
        return false;
    }
    
    renderRow (row_index, columns) {
        return (
            _.map(columns, (col_label,col_index) =>
                <div key={col_label + col_index} className="col-sm-1">
                    <Radio
                        name={row_index}
                        onClick={this.updateResponse}
                        data-row={row_index}
                        data-col={col_index}
                        defaultChecked={this.isSelected(row_index, [row_index,col_index])}
                    ></Radio>
                </div>
            )
        );
    }

    render () {
        const question = this.props.question;
        const details = question.details;
       
        const column_header = _.map(details.columns, (t,i) => 
            <div key={t + i} className="col-sm-1">
                <span>{t}</span>
            </div>
        );
        
        const rows = _.map(details.rows, (row_label,row_index) =>
            <div key={row_label + row_index} className="row publish-row">
                <div className="col-sm-1 publish-row-label">{row_label}</div>
                {this.renderRow(row_index, details.columns)}
            </div>
        );
        
        return (
            <div id={question.id} className="question-container">
                <div className="row publish-row">
                    <div className="col-sm-1"></div>
                    {column_header}
                </div>
                {rows}
            </div>
        );
    }
}
