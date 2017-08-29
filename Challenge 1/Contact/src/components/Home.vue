<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>Contact Management Application</h1>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add New Contact</h3>
      </div>
      <div class="panel-body">
        <form class="form-horizontal" id="form" @submit.prevent="addNewContact()">
          <div class="container">
            <div class="row">

              <div class="col-xs-5">
                <div class="form-group">
                  <label for="name" class="col-xs-3 control-label">Name:</label>
                  <div class="col-xs-9">
                    <input name="Name" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('Name') }" type="text" placeholder="Name*" id="Name" class="form-control" v-model="newContact.name">
                    <span v-show="errors.has('Name')" class="error-font-style help is-danger">{{ errors.first('Name') }}</span>
                  </div>
                </div>
              </div>
              <div class="col-xs-5">
                <div class="form-group">
                  <label for="email" class="col-xs-3 control-label text-left">Email:</label>
                  <div class="col-xs-9" :class="{'control': true}">
                    <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Email*" title="Email" id="email" class="form-control" v-model="newContact.email">
                    <span v-show="errors.has('email')" class="error-font-style help is-danger">{{ errors.first('email') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-5">
                <div class="form-group">
                  <label for="address" class="col-xs-3 control-label">Address:</label>
                  <div class="col-xs-9">
                    <input type="text" id="address" class="form-control" title="Contact Address" placeholder="Contact Address" v-model="newContact.address">
                  </div>
                </div>
              </div>
              <div class="col-xs-5">
                <div class="form-group">
                  <label for="phone_num" class="col-xs-3 control-label">Phone:</label>
                  <div class="col-xs-9">
                    <input name="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="number" id="phone_num" placeholder="Phone Number*" class="form-control" v-model="newContact.phone_num">
                    <span v-show="errors.has('phone')" class="error-font-style help is-danger">{{ errors.first('phone') }}</span>
                  </div>
                </div>
              </div>
            </div>



            <div class="row">
              <div class="col-xs-5">
                <div class="form-group">
                  <label for="company" class="col-xs-3 control-label">Company:</label>
                  <div class="col-xs-9">
                    <input name="company" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('company') }"
                    type="text" id="company" title="Company Name" class="form-control"
                    v-model="newContact.company" placeholder="Company Name*">
                  </div>
                </div>
              </div>
              <div class="col-xs-5">
                <div class="form-group">
                  <label for="designation" class="col-xs-3 control-label text-left">Designation:</label>
                  <div class="col-xs-9">
                    <input type="designation" title="Position Held in company" id="designation" class="form-control" v-model="newContact.designation" placeholder="Position in company">
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-xs-offset-9">
                <input type="submit" :disabled="errors.any()" class="btn btn-primary" value="Add Contact">
              </div>
            </div>


          </div>
        </form>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="container">
          <div class="row">
            <div class="col-xs-5">
              <h3>Contact Lists</h3>
            </div>
            <div class="col-xs-6" style="margin-right: 7%; margin-top: 1.5%;">
              <div class="text-left">
                <th class="col-xs-8">
                  <input type="text" name="" v-model="filterKey" placeholder="Filter by Name, Address or Phone" class="form-control">
                </th>
                <th class="col-xs-3">
                  <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span class="glyphicon glyphicon-sort"></span>&nbsp Sort
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <li><a @click="sortBy('name')">Name</a></li>
                      <li><a @click="sortBy('address')">Address</a></li>
                      <li><a @click="sortBy('company')">Company Name</a></li>
                    </ul>
                  </div>
                </th>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in filterBy(contacts, filterKey)">
              <td><router-link :to="{ path: `/view/${contact['.key']}` }">{{contact.name}}</router-link></td>
              <td>{{contact.address}}</td>
              <td>{{contact.company}}</td>
              <td>{{contact.phone_num}}</td>
              <td><span class="glyphicon glyphicon-trash" @click="deleteContact(contact)"></span></td>
              <td><router-link :to="{ path: `/edit/${contact['.key']}` }"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import {db} from '../firebase'
import toastr from 'toastr'
let contactRef = db.ref('contacts');
export default {
  name: 'Home',
  firebase: {
    contacts: contactRef
  },

  data: function(){
    return {
      filterKey: '',
      sortKey: '',
      reverse: false,
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

  methods: {
    addNewContact: function(){
      contactRef.push(this.newContact);
      toastr.success('Contact added successfully');
      this.newContact.name = "";
      this.newContact.address = "";
      this.newContact.email = "";
      this.newContact.phone_num = "";
      this.newContact.company = "";
      this.newContact.designation = "";
    },

    deleteContact: function(contact){
      contactRef.child(contact['.key']).remove();
      toastr.error('Contact deleted successfully!');
    },

    sortBy: function(sortKey){
      this.contacts.sort(function(a, b) {
        if(sortKey == 'name'){
          return a.name > b.name;
        }else if (sortKey == 'address') {
          return a.address > b.address;
        }else if (sortKey == 'company') {
          return a.company > b.company;
        }
      });
      this.contacts.sort();
    }
  },

  watch: {
    filterKey: function(){
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.error-font-style{
  font-size: 0.9vw;
  font-weight: bolder;
}
</style>
