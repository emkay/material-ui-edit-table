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
import EditTable from '..;

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

const rows = []

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
