import React, { Component } from 'react'

export default class TdOfTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: props.name,
			value: props.value, 
			Amounts: 0,
			ids: "Value",
		};
	}

	changeAmount= (e) => {
		 const quantitiy = e.target.value;
		 this.setState({Amounts:Math.round(parseInt(quantitiy) * this.state.value * 100)/100});
	}
  render() {
	return (
		<tr>
			<td>{this.state.name}</td>
			<td><input className='bg-light border border-0 rounded p-none text-center' type="number" name='quantity' onChange={this.changeAmount} /></td>
			<td>${this.state.Amounts}</td>
		</tr>
	)
  }
}
