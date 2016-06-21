import React from 'react'
import $ from 'jquery'
import { BASE_URL } from '../constants'
import Users from './Users'
import AddUser from './AddUser'


class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { users: [] }
	}

	componentWillMount() {
		$.ajax({
			url: `${BASE_URL}/users`,
			type: 'GET'
		}).done( users => {
			this.setState({ users })
		})
	}

	deleteUser(id) {
		event.preventDefault()
		$.ajax({
			url: `${BASE_URL}/users/${id}`,
			type: 'DELETE'
		}).done( () => {
			let users = this.state.users
			let index = users.findIndex( user => user.id === id )
			this.setState({
				users: [
					// everything from zero to the one I deleted
					// with slice the first boundary is inclusive, the second is not
					...users.slice(0, index),
					// from the one after I deleted to the last one 
					...users.slice(index + 1, users.length)
				]
			})
		})
	}

	addUser(user) {
		this.setState({ users: [...this.state.users, {...user} ] })
	}

	render() {
		return ( 
			<div className="row">
				<Users 
					users={this.state.users}
					deleteUser={this.deleteUser.bind(this)}/>
				<AddUser addUser={this.addUser.bind(this)} />
			</div>
		)
	}
}

export default Home 
