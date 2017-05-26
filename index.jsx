'use strict';
import React from 'react';
import {IconButton, Toggle, TextField, RaisedButton} from 'material-ui';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';
import Check from 'material-ui/svg-icons/navigation/check';
import times from 'lodash.times';

let MaterialUiTableEdit =  React.createClass({

	getDefaultProps: () => {
		return {
			headerColumns: [],
			rows: [],
			onChange: function () {}
		}
	},

	getInitialState: function () {
		return {
			rows: this.props.rows,
			hoverValue: false,
			currentRow: false
		}
	},

	contextTypes: {
		muiTheme: React.PropTypes.object.isRequired
	},

	update: function () {
		const row = this.state.rows.filter((row) => {
			return row.selected
		});
		this.props.onChange(row[0])
	},

	getCellValue: function (cell) {

		const self = this;
		const id = cell && cell.id;
		const type = this.props.headerColumns[id].type;
		const selected = cell && cell.selected;
		const value = (cell && cell.value) || "";
		const rowId = cell && cell.rowId;
		const header = cell && cell.header;
		const style = cell && cell.style;
		const textFieldId = [id, rowId, header].join('-');

		const onTextFieldChange = (e) => {
			const target = e.target;
			const value = target.value;
			let rows = self.state.rows;
			rows[rowId].columns[id].value = value;
			self.setState({rows: rows})
		};

		const onToggle = (e) => {
			let rows = self.state.rows;
			rows[rowId].columns[id].value = !rows[rowId].columns[id].value;
			self.setState({rows: rows})
		};

		if (header || (type && type === 'ReadOnly')) {
			return <p style={{color: '#888'}}>{value}</p>
		}

		if (type) {
			if (selected) {
				if (type === 'TextField') {
					return  <TextField
						id={textFieldId}
						onChange={onTextFieldChange}
						style={style}
						value={value}
					/>
				}
				if (type === 'Toggle') {
					return <Toggle onToggle={onToggle} toggled={value} />
				}
			} else {
				if (type === 'Toggle') {
					return <Toggle disabled onToggle={onToggle} toggled={value} />
				}
			}
		}

		return  <TextField
			id={textFieldId}
			style={style}
			disabled
			value={value}
		/>
	},

	renderHeader: function () {
		const headerColumns = this.props.headerColumns;
		const columns = headerColumns.map((column, id) => {
			return {value: column.value}
		});
		const row = {columns: columns, header: true, id: 'header'};

		return this.renderRow(row)
	},

	renderRow: function (row) {
		const self = this;
		const columns = row.columns;
		const rowStyle = {
			width: '100%',
			display: 'flex',
			flexFlow: 'row nowrap',
			padding: 12,
			border: 0,
			borderBottom: '1px solid #ccc',
			height: 65
		};

		const checkboxStyle = {
			display: 'flex',
			flexFlow: 'row nowrap',
			width: 40,
			minWidth: 40,
			maxWidth: 40,
			height: 24,
			padding: '5px 0px 0px 10px',
			alignItems: 'center'
		};

		const rowId = row.id;
		const rowKey = ['row', rowId].join('-');

		const onRowClick = function (e) {
			let rows = self.state.rows;
			rows.forEach((row, i) => {
				if (rowId !== i) row.selected = false
			});
			rows[rowId].selected = !rows[rowId].selected;
			self.setState({rows: rows})
		};

		const r = self.state.rows[rowId];
		const selected = (r && r.selected) || false;

		const tooltip = selected ? 'Done' : 'Edit';

		const onCellClick = function (e) {
			if (selected) {
				self.update()
			}
			onRowClick(e)
		};

		const onDeleteRow = function (e) {
			let rows = self.state.rows;
			let newRows = [];
			rows.map((row, i) => {
				if (rowId !== i) newRows.push(row);
			});
			self.setState({rows: newRows})
		};

		const checkbox = row.header ?
			<div style={checkboxStyle}/>
			:
			(
				selected ?
					<IconButton style={checkboxStyle} tooltip={tooltip} onClick={onCellClick}>
						<Check />
					</IconButton>
						:
					<IconButton style={checkboxStyle} tooltip={tooltip} onClick={onCellClick}>
						<ModeEdit />
					</IconButton>

			);

		const deleteButton = row.header ?
			<div style={checkboxStyle}/>
			:
			(
				selected ?
					<IconButton style={checkboxStyle} tooltip="Delete" onClick={onDeleteRow}>
						<Delete />
					</IconButton>
					:
					<div style={checkboxStyle}/>

			);

		let {headerColumns} = this.props;

		return (

			<div key={rowKey} className='row' style={rowStyle}>
				{deleteButton}
				{checkbox}
				{columns.map((column, id) => {

					if(headerColumns[id]) {

						let headerColumnStyle =  {
							width: 80,
							fontSize : '12px',
							marginLeft: '5px'
						};

						if(headerColumns[id].style) {
							headerColumnStyle = Object.assign({}, headerColumnStyle, headerColumns[id].style)
						}

						const cellStyle = {
							display: 'flex',
							flexFlow: 'row nowrap',
							flexGrow: 0.15,
							flexBasis: 'content',
							alignItems: 'center',
							height: 30,
							width: headerColumnStyle.width,
							minWidth: headerColumnStyle.width,
							maxWidth: headerColumnStyle.width,
							fontSize: headerColumnStyle.fontSize,
							marginLeft:  headerColumnStyle.marginLeft
						};

						if(row.header) {
							cellStyle["paddingTop"] = 20;
							cellStyle["verticalAlign"] = 'bottom';
						}

						const columnKey = ['column', id].join('-');
						column.selected = selected;
						column.rowId = rowId;
						column.id = id;
						column.header = row.header ? row.header : false;
						column.width = cellStyle.width;
						column.fontSize = cellStyle.fontSize;
						column.style = headerColumnStyle;

						return (
							<div key={columnKey} className='cell' style={cellStyle}>
								<div>
									{this.getCellValue(column)}
								</div>
							</div>
						)

					} else {
						return "";
					}

				})}
			</div>
		)
	},

	render: function () {

		const self = this;
		const style = {
			display: 'flex',
			flexFlow: 'column nowrap',
			justifyContent: 'space-between',
			alignItems: 'center',
			fontFamily: 'Roboto, sans-serif'
		};

		const buttonStyle = {
			display: 'flex',
			flexFlow: 'row nowrap',
			marginTop: 10
		};

		const rows = this.state.rows;
		const columnTypes = this.props.headerColumns.map((header) => {
			return header.type
		});

		const onButtonClick = (e) => {
			const newColumns = times(columnTypes.length, (index) => {
				const defaults = {
					'TextField': '',
					'Toggle': true
				};

				const value = defaults[columnTypes[index]];

				return {value: value}
			});

			const updatedRows = rows.map((row) => {
				if (row.selected) {
					self.update();
					row.selected = false
				}
				return row
			});
			updatedRows.push({columns: newColumns, selected: true});
			self.setState({rows: updatedRows})
		};

		return (
			<div className='container' style={style}>
				{this.renderHeader()}
				{rows.map((row, id) => {
					row.id = id;
					return this.renderRow(row)
				})}
				<RaisedButton
					onClick={onButtonClick}
					style={buttonStyle}
					label='Add Row'
				/>
			</div>
		)
	}
});

module.exports = MaterialUiTableEdit;
