# material-ui-table-edit
Material UI Table Edit

<img src="https://raw.githubusercontent.com/emkay/material-ui-table-edit/master/example/table-editor.gif">

## Install

`npm i material-ui-table-edit`

## Usage

```javascript
const React = require('react')
const ReactDOM = require('react-dom')
const getMuiTheme = require('material-ui/styles/getMuiTheme').default
const baseTheme = require('material-ui/styles/baseThemes/darkBaseTheme')
const EditTable = require('material-ui-table-edit')
const container = document.createElement('div')

document.body.appendChild(container)
const headers = [
  {value: 'Name', type: 'TextField', width: 200},
  {value: 'Address', type: 'TextField', width: 200},
  {value: 'Phone', type: 'TextField', width: 200},
  {value: 'Date', type: 'DatePicker', width: 200},
  {value: 'Enabled', type: 'Toggle', width: 50},
  {value: 'Last Edited By', type: 'ReadOnly', width: 100}
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

## [Code of Conduct](https://github.com/emkay/material-ui-table-edit/blob/master/CODE_OF_CONDUCT.md)

## [Contributing](https://github.com/emkay/material-ui-table-edit/blob/master/CONTRIBUTING.md)

## [Changelog](https://github.com/emkay/material-ui-table-edit/blob/master/CHANGELOG.md)
