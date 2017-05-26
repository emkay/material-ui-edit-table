# material-ui-table-edit
Material UI Table Edit

<img src="https://raw.githubusercontent.com/emkay/material-ui-table-edit/master/example/table-editor.gif">

## Install

`npm i material-ui-table-edit`

## Usage

```javascript
'use strict';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import EditTable from '..';

document.body.appendChild(container)
const headers = [
  {value: 'Name', type: 'TextField', width: 200},
  {value: 'Address', type: 'TextField', width: 200},
  {value: 'Phone', type: 'TextField', width: 200},
  {value: 'Enabled', type: 'Toggle', width: 50},
  {
      	value: 'Last Edited By', 
      	type: 'ReadOnly',
	style: {
		fontSize: '14px',
		width: 100,
		marginLeft: '5px'
	}
  }
]

const rows = [
  {columns: [
    {value: 'Michael'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: false},
    {value: 'Michael at 4:20pm'}
  ]},
  {columns: [
    {value: 'Sara'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: true},
    {value: 'Someone at 5:50pm'}
  ]},
  {columns: [
    {value: 'Randy Randerson'},
    {value: '5555 Somewhere st.'},
    {value: '888-555-3333'},
    {value: true},
    {value: 'Randy at 3:33pm'}
  ]}
]

const onChange = (row) => {
  console.log(row)
}

const Main = React.createClass({
  getChildContext () {
    return {muiTheme: getMuiTheme(baseTheme)}
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  render () {
    return (
      <EditTable
        onChange={onChange}
        rows={rows}
        headerColumns={headers}
      />
    )
  }
})

ReactDOM.render(
  <Main />,
  container
)
```

## [Code of Conduct](https://github.com/emkay/material-ui-table-edit/blob/master/CODE_OF_CONDUCT.md)

## [Contributing](https://github.com/emkay/material-ui-table-edit/blob/master/CONTRIBUTING.md)

## [Changelog](https://github.com/emkay/material-ui-table-edit/blob/master/CHANGELOG.md)
