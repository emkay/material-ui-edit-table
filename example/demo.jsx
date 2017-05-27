const React = require('react')
const ReactDOM = require('react-dom')
const getMuiTheme = require('material-ui/styles/getMuiTheme').default
const baseTheme = require('material-ui/styles/baseThemes/darkBaseTheme')
const EditTable = require('..')
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

const rows = [
  {columns: [
    {value: 'Michael'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: new Date()},
    {value: false},
    {value: 'Michael at 4:20pm'}
  ]},
  {columns: [
    {value: 'Sara'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: new Date()},
    {value: true},
    {value: 'Someone at 5:50pm'}
  ]},
  {columns: [
    {value: 'Randy Randerson'},
    {value: '5555 Somewhere st.'},
    {value: '888-555-3333'},
    {value: new Date()},
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
