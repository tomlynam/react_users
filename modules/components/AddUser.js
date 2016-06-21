import React from 'react'
import $ from 'jquery'
import { BASE_URL } from '../constants'

class AddUser extends React.Component {
	handleSubmit(e) {
		e.preventDefault()
		// get all values
		let first_name = this.refs.first_name.value
		let last_name = this.refs.last_name.value
		let phone_number = this.refs.phone_number.value
		// make ajax call
		$.ajax({
			url: `${BASE_URL}/users`,
			type: 'POST',
			data: { user: { first_name, last_name, phone_number } }
		}).done( user => {
		// notify home of change
			this.props.addUser(user)
			this.refs.addForm.reset()			
		})
		// clear form
	}

	render() {
		return (
			<div className="col m4">
				<h4 className="center">Add User</h4>
				<form ref="addForm" onSubmit={this.handleSubmit.bind(this)}>
					<input placeholder="first name" ref="first_name" required={true} />
					<input placeholder="last name" ref="last_name" required={true} />
					<input placeholder="phone number" ref="phone_number" required={true} />
					<button className="btn" type="submit">Add</button>
				</form>
			</div>
		)
	}
}

export default AddUser
