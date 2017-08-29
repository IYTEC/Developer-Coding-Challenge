<template>
  <div id="app" class="container">
    <div class="page-header" v-for="data in currContact">
      <h1>Contact Management Application</h1>


      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>Edit {{data.name}}'s Info</h3>
        </div>
        <div class="panel-body">
          <!-- <form class="form-horizontal" id="form"> -->
            <form class="form-horizontal" id="form" @submit.prevent="updateContact(data)">
            <div class="container">

              <div class="row">
                <div class="col-xs-5">
                  <div class="form-group">
                    <label for="name" class="col-xs-3 control-label">Name:</label>
                    <div class="col-xs-9">
                      <input name="Name" v-validate.initial="'required'"
                      :class="{'input': true, 'is-danger': errors.has('Name') }"
                      type="text" placeholder="Name*" id="Name" class="form-control" v-model="editContact.name = data.name">

                      <span v-show="errors.has('Name')" class="error-font-style help is-danger">{{ errors.first('Name') }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="form-group">
                    <label for="email" class="col-xs-3 control-label text-left">Email:</label>
                    <div class="col-xs-9" :class="{'control': true}">
                      <input v-validate="'required|email'"
                      :class="{'input': true, 'is-danger': errors.has('email') }" name="email"
                      type="email" placeholder="Email*" title="Email" id="email" class="form-control" v-model="editContact.email = data.email">

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
                      <input type="text" id="address" class="form-control" title="Contact Address"
                      placeholder="Contact Address" v-model="editContact.address=data.address">
                    </div>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="form-group">
                    <label for="phone_num" class="col-xs-3 control-label">Phone:</label>
                    <div class="col-xs-9">
                      <input name="phone" v-validate="'required|numeric'"
                      :class="{'input': true, 'is-danger': errors.has('phone') }" type="number" id="phone_num"
                      placeholder="Phone Number*" class="form-control" v-model="editContact.phone_num=data.phone_num">

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
                      <input type="text" id="company" title="Company Name" class="form-control" v-model="editContact.company = data.company" placeholder="Company Name">
                    </div>
                  </div>
                </div>
                <div class="col-xs-5">
                  <div class="form-group">
                    <label for="designation" class="col-xs-3 control-label text-left">Designation:</label>
                    <div class="col-xs-9">
                      <input type="designation" title="Position Held in company" id="designation" class="form-control" v-model="editContact.designation=data.designation" placeholder="Position in company">
                    </div>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-xs-offset-9">
                  <input type="submit" :disabled="errors.any()" class="btn btn-primary" value="Update Contact">
                </div>
              </div>


            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {db} from '../firebase'
import toastr from 'toastr'
export default {

  name: 'Edit',
  firebase: function(){
    return {
      currContact: db.ref('contacts').orderByKey().equalTo(this.$route.params.id)
    }
  },

  data: function(){
    return {
      contacts: {},
      editContact: {
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
    updateContact: function(contact){
        const childKey = contact['.key'];
        delete contact['.key'];
        this.$firebaseRefs.contacts.child(childKey).set(contact)
        toastr.success('Contact updated successfully');
        this.$router.push({ name: 'Home'})
        // console.log(contact);
    }
  },

  created: function(){
        this.$bindAsObject('contacts', db.ref('contacts').orderByKey().equalTo(this.$route.params.id));
    }


}
</script>

<style lang="css">
.error-font-style{
  font-size: 0.9vw;
  font-weight: bolder;
}
</style>
