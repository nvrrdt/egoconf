### Macro guidelines
```
stories: {
    search field with autocomplete,         DONE
    explore met modal,                      DONE
    messages met graded qualities lists,    DONE
    statistics,                             DONE
    explore statistics,                     DONE
    profile statistics,                     DONE
    ask in explore and messages
    history,                                DONE
    constraints,
    settings,
    admin,
    ads,
    mail if comment,
    confirmation mail,
    rules,
    positive qualities/adjectives and projects/references in autocomplete,
    a few bots
}
```

### Micro adaptations
```
- put autocomplete in a component, create own version of vue-multiselect
- constraints of the forms must be copied to firebase database itself, as a redundancy
- try without page refreshes when switching between tabs like messages and explore
- are the firebase database rules ok?
- maybe a log to follow up changing actions when accepting/rejecting messages
- !!! why not ask a relative to grade my quality? !!!
- send a verification email when signing up
- create a loop or listener or so, to check for new messages
- a clause in the license that states that websites that use egoconf, must be available for the general global public
- an autocomplete on the qualities and it's adjectives
- pagination on messages and history
- lookup send-by-user in messages page instead of showing a hash
- set maxlength of project in modal in explore page
- // once de store:state.messages becomes very large, is this a problem?
- 'a delete account' in settings
- 'isAdmin: bool' and 'isSpace: bool' in users database
- // a 'thank you' with comment in the messages if accepted // dunno what to do
- in explore modal it must be 'Project or reference'
- definitely implement vuex, getmessages and it's store in profile doesn't work, state isn't persistent when changing from messages to profile
- sort mean in statistics
- make date from hash in chart and change colors in chart
```
