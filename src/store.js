var store = {
  // debug: true,
  state: {
    searchedPerson: {
      userid: '',
      firstname: '',
      lastname: '',
      handle: ''
    }
  },
  // 'searched' is for the searches through the autocomplete in the top bar
  getSearchedUserid () {
    return this.state.searchedPerson.userid
  },
  setSearchedUserid (newValue) {
    this.state.searchedPerson.userid = newValue
  },
  clearSearchedUserid () {
    this.state.searchedPerson.userid = ''
  },
  getSearchedFirstname () {
    return this.state.searchedPerson.firstname
  },
  setSearchedFirstname (newValue) {
    this.state.searchedPerson.firstname = newValue
  },
  clearSearchedFirstname () {
    this.state.searchedPerson.firstname = ''
  },
  getSearchedLastname () {
    return this.state.searchedPerson.lastname
  },
  setSearchedLastname (newValue) {
    this.state.searchedPerson.lastname = newValue
  },
  clearSearchedLastname () {
    this.state.searchedPerson.lastname = ''
  },
  getSearchedHandle () {
    return this.state.searchedPerson.handle
  },
  setSearchedHandle (newValue) {
    this.state.searchedPerson.handle = newValue
  },
  clearSearchedHandle () {
    this.state.searchedPerson.handle = ''
  }
}

export default store
