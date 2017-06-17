### Macro guidelines
```
stories: {
    search field with autocomplete,
    explore met modal,
    messages,
    explore met graded quelities lists,
    profile,
    statistics,
    history,
    constraints,
    settings,
    admin
}
```

### Micro adaptations
```
- put autocomplete in a component, create own version of vue-multiselect
- constraints of the forms must be copied to firebase database itself, as a redundancy
- try without page refreshes when switching between tabs like messages and explore
- are the firebase database rules ok?
- maybe a log to follow up changing actions when accepting/rejecting messages
```
