<template>
  <div id="app">

	<ul class="nav nav-pills nav-justify">
		<li role="presentation" class="active"><a href="#">Businesses</a></li>
		<li role="presentation"><a href="#">Events</a></li>
		<li role="presentation"><a href="#">Locations</a></li>
	</ul>
	<br />

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Add a Business</h3>
		</div>
		<div class="panel-body">
			<form id="form">
				<div class="form-group">
					<label for="exampleInputPassword1">Contact Name</label>
					<input v-model="newContact.name" type="text" class="form-control" id="exampleInputPassword1" placeholder="Contact Name">
				</div>

				<div class="form-group">
					<label for="basic-url">Email</label>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon3">/businesses/</span>
						<input v-model="newContact.email" type="email" class="form-control" id="basic-url" aria-describedby="basic-addon3">
					</div>
				</div>
				<div class="form-group">
					<label for="basic-url">Address</label>
					<textarea v-model="newContact.address" name="" id="" cols="30" rows="10"></textarea>
				</div>
				<button type="button" class="btn btn-default" v-if="newContact['.key']" v-on:click="updatePost(newContact)">Update</button>
				<button type="submit" class="btn btn-default" v-if="!newContact['.key']" v-on:click="addContact">Add Company</button>
			</form>
		</div>
	</div>

	<div class="panel panel-default">
		<!-- Default panel contents -->
		<div class="panel-heading">Contacts</div>

		<!-- Table -->
		<table class="table table-striped">
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Address</th>
				<th>Phone</th>
			</tr>
			<tr v-for="contact in contacts" :key="contact['.key']">
				<td contenteditable v-model="newContact.name">{{contact.name}}</td>
				<td>{{contact.email}}</td>
				<td>{{contact.address}}</td>
				<td>
					<button v-on:click="editContact(contact)" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
					<button v-on:click="removeContact(contact)" type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>
				</td>
			</tr>
		</table>
	</div>

	<ul class="errors">
	</ul>
</div>
</template>

<script>
import {db} from '../firebaseConfig'
let contactsRef = db.ref('contacts')
export default {
  // name: 'Home',
  data: function(){
    return {
      contacts: [],
      newContact: {
        name: '',
        address: '',
        email: '',
        phone_num: '',
        company: '',
        designation: ''
      }
    }
  },
  // methods
  methods: {
		addContact: function () {
			contactsRef.push(this.newContact);
			this.newContact.name = '';
			this.newContact.address = '';
			this.newContact.email = '';
      this.newContact.phone_num = '';
      this.newContact.company = '';
      this.newContact.designation = '';
		},
		editContact: function(contact) {
			// Set post values to form
			this.newContact = contact
		},
		updateContact: function(contact) {
			const childKey = contact['.key'];
			/*
			 * Firebase doesn't accept speacial chars as value
			 * so delete `.key` property from the post
			 */
			delete contact['.key'];
			/*
			 * Set the updated post value
			 */
			this.$firebaseRefs.contacts.child(childKey).set(contact)
		},
    removeContact: function (contact) {
      contactsRef.child(contact['.key']).remove()
			toastr.success('Business removed successfully')
    },

  },
	// Explicitly set binding data to firebase as an array.
	created: function(){
		this.$bindAsObject('contacts', contactsRef);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app{
	padding: 2em
}
</style>
