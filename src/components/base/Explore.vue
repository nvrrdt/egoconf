<template>
  <div>
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <a class="btn btn-secondary text-capitalize" href="/base/messages" role="button">Messages</a>
      <a class="btn btn-secondary text-capitalize" href="/base/profile" role="button">Profile</a>
      <a class="btn btn-secondary text-capitalize active" href="/base/explore" role="button">Explore</a>
      <a class="btn btn-secondary text-capitalize" href="/base/history" role="button">History</a>
    </div>     
    <div id="wrapper" class="container"> 
      <modal v-if="showModal"> 
        <h3 slot="header" class="modal-title">
          Modal title
        </h3>
        
        <div slot="body">
          test3
        </div>

        <div slot="footer">
          <button type="button" class="btn btn-outline-info" @click="closeModal()">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">Submit</button>
        </div>
      </modal>
      <button type="button" class="btn btn-primary" @click="openModal()">Open Modal</button>
    </div>
  </div>
</template>
<script>
import Modal from '@/components/base/ExploreModal'

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
</style>
