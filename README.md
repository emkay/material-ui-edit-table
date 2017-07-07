# material-ui-table-edit

[![Greenkeeper badge](https://badges.greenkeeper.io/emkay/material-ui-table-edit.svg)](https://greenkeeper.io/)
Material UI Table Edit

<img src="https://travis-ci.org/emkay/material-ui-table-edit.svg?branch=master">

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

const onDelete = (e) => {
  console.log(e)
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
        onDelete={onDelete}
        rows={rows}
        headerColumns={headers}
        enableDelete={true}
      />
    )
  }
})

ReactDOM.render(
  <Main />,
  container
)
```

## React-Tap-Event-Plugin

[`material-ui`](https://www.npmjs.com/package/material-ui#react-tap-event-plugin) recommands that you use the [`react-tap-event-plugin`](https://github.com/zilverline/react-tap-event-plugin) at the app level. It has been removed from this component, but you should add it yourself until it is removed from `material-ui`.

## [Code of Conduct](https://github.com/emkay/material-ui-table-edit/blob/master/CODE_OF_CONDUCT.md)

## [Contributing](https://github.com/emkay/material-ui-table-edit/blob/master/CONTRIBUTING.md)

## [Changelog](https://github.com/emkay/material-ui-table-edit/blob/master/CHANGELOG.md)
