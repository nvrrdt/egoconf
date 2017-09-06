import Vue from 'vue'
import main from '../src/main'

describe('main.test.js', () => {
  let cmp, vm

  beforeEach(() => {
    cmp = Vue.extend(main) // Create a copy of the original component
    vm = new cmp({
      data: { // Replace data value with this fake data
        firstname: ['Cat']
      }
    }).$mount() // Instances and mounts the component
  })

  it('equals messages to ["Cat"]', () => {
    expect(vm.firstname).toEqual(['Cat'])
  })
})