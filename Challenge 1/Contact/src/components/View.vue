<template>
  <div class="container">
    <div v-for="data in viewContact">
      <h1>{{data.name}}'s Details</h1>
      <p>Name: {{data.name}}</p>
      <p>Email: {{data.email}}</p>
      <p>Address: {{data.address}}</p>
      <p>Phone: {{data.phone}}</p>
      <p>Company: {{data.company}}</p>
      <p>Designation in company: {{data.designation}}</p>
    </div>
  </div>
</template>

<script>

import {db} from '../firebase'

export default {
  firebase: function(){
    return {
      viewContact: db.ref('contacts').orderByKey().equalTo(this.$route.params.id)
    }
  },

  mounted: function(){
    let contactUID = this.$route.params.id;
    console.log(contactUID);
  }
}
</script>

<style>

</style>
