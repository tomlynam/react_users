import React from 'react'
import { BASE_URL } from '../constants'
import $ from 'jquery'
import { Link } from 'react-router'

class ShowUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: { first_name: '', last_name: '', phone_number: '' },
			edit: false
		}
	}

	componentWillMount() {
		let id = this.props.params.id
		$.ajax({
			url: `${BASE_URL}/users/${id}`,
			type: 'GET'
		}).done( user => {
			this.setState({ user })
		})
	}

	show() {
		let user = this.state.user
		return(
			<div className="container row">
				<h2 className="center">{user.first_name}{user.last_name}</h2>
				<h3 className="col m3 offset-m3">Phone:</h3>
				<h3 className="col m6">{user.phone_number}</h3>
				<div className="center">
					<button className="btn" onClick={this.toggleEdit.bind(this)}>Edit</button>
					<br/>
					<br/>
					<Link to="/" className="btn red" >Back</Link>
				</div>
			</div>
		)
	}

	handleSubmit(e) {
		e.preventDefault()
		let first_name = this.refs.first_name.value
		let last_name = this.refs.last_name.value
		let phone_number = this.refs.phone_number.value
		$.ajax({
			url: `${BASE_URL}/users/${this.state.user.id}`,
			type: 'PUT',
			data: { user: { first_name, last_name, phone_number } }
		}).done( user => {
			this.setState({ user, edit: false })
		})
	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit })
	}


	edit() {
		let user = this.state.user
		return(
			<form className="container" ref="editUser" onSubmit={this.handleSubmit.bind(this)}>
				<input ref="first_name" placeholder="name" required={true} defaultValue={user.first_name} />
				<input ref="last_name" placeholder="description" defaultValue={user.last_name} />
				<input ref="phone_number" placeholder="801-555-5309" defaultValue={user.phone_number} />
				<button type="button" className="btn red" onClick={this.toggleEdit.bind(this)}>Cancel</button>
				<button type="submit" className="btn">Save</button>
			</form>
		)
	}

	render() {
		if (this.state.edit)
			return this.edit()
		else
			return this.show()
	}

}

export default ShowUser
