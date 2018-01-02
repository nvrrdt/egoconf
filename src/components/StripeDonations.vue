<template>
<div>
  <vue-form :state="formstate" @submit.prevent="checkout" v-model="formstate" class="form-inline justify-content-center formpos">

    <validate auto-label class="form-group required-field">
      <input type="number" name="donation-amount" class="form-control mb-2 mr-sm-2 mb-sm-0" v-model.lazy="customAmount" min="5" required placeholder="Amount (minimum 5€)">
      
      <field-messages name="donation-amount" show="$touched || $submitted" class="form-control-feedback">
        <div slot="required" style="color: red">Fill in amount</div>
        <div slot="min" style="color: red">Minimum 5</div>
      </field-messages>
    </validate>

    <button type="submit" class="btn btn-primary" style="margin-left:10px;">- Donate -</button>
  </vue-form>
</div>
</template>

<script>
import VueForm from 'vue-form'
import VueStripeCheckout from 'vue-stripe-checkout'
import * as firebase from 'firebase'

export default {
  mixins: [VueForm],
  data () {
    return {
      formstate: {},
      customAmount: ''
    }
  },
  methods: {
    checkout () {
      if (this.formstate.$invalid) {
        // alert user and exit early
        return
      }
      // this.$checkout.close()
      // is also available.
      this.$checkout.open({
        name: '',
        currency: 'EUR',
        amount: this.customAmount * 100,
        token: (token) => {
          // handle the token
        }
      })
    }
  }
}
</script>

<style>
.formpos {
  padding-top: 25px;
  padding-bottom: 25px;
}
</style>