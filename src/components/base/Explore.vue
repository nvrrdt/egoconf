<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize active" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>
    <div>
        <h3>Userprofile from:</h3>
        <!-- <p>Name: {{ view.first_name }} {{ view.last_name }}</p>
        <p>Handle: {{ view.handle }}</p> -->
    </div> 
    <div id="wrapper" class="container" v-on:keyup.esc="closeModal"> 
      <modal v-if="showModal"> 
        <h3 slot="header" class="modal-title pull-right">
          <button type="button" class="close pull-right" data-dismiss="modal" @click="closeModal()">&times;</button>
          <h4>Grade a quality</h4>
        </h3>
        
        <div slot="body">
          test3
          <!-- help_texts = {
            'quality': ('Insert a the quality you like to grade'),
            'project': ('Insert the project where you got to know this person\'s quality'),
            'grade': ('Give a number between 6 and 10 on a scale to 10'),
          }
          if data < 6:
            raise ValidationError("Value must be greater than or equal to 6")
          elif data > 10:
            raise ValidationError("Value must be lessser than or equal to 10") -->
        </div>

        <div slot="footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">Submit</button>
        </div>
      </modal>
      <button type="button" class="btn btn-primary" @click="openModal()">Grade a quality</button>
    </div>
  </div>
</template>
<script>
// taken from JuneRockwell/BootstrapVueModal
import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    submitAndClose () {
    }
  }
}
</script>
<style>
  .btn{
    margin-top:10px;
    margin-right:10px;
    margin-bottom:10px;
    margin-left:10px;
  }
  #wrapper {
    margin-top: 60px;
  }
  .modal-title {
    width: 100%;
  }
</style>
