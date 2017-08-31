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
    payments,
    mail if comment,
    confirmation mail,
    rules,
    positive qualities/adjectives and projects/references in autocomplete,
    a few bots,
    handshake,
    texts
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
- don't grade the same quality twice in the same week
- don't show autocomplete results after x searches
- Total msgs, answered, accepted, ask, bid, per quality, per project, ... try to improve statistics
- personal tags for messages, to group messages and show them publicly
- in firefox you have to double click the radio in messages form, solution is to do 'input and label'-combination differently with a for
- when resubmitting a different answer for a message, hitting submit won't close the panel
- implement change password in settings
- implement a jobmarket (-place) where hourly/daily/monthly rates for a certain job could be proposed 
  and rejected/accepted, based on market demands (ask/bid)
- implement a ethereum smart contract for every grade being added, blockchain is there to make people accountable
- create a map to show unique and overlapping qualities in function of certain references/projects, and redundancy for the same
```

### help:
sudo fuser -k 8080/tcp

### Constraints:
```
 * is_unknown || is_inappropriate = max 3 per user per last month === blocked for 1 week                                    DONE
 * 3 users where blocked last month === banned for 1) 1 week 2) 2 weeks 3) 1 month 4) 3 months 5) 6 months in last month    DONE
 * >= 20 messages from multiple users per 15 minutes === bomb => block messages until over
 * max 1 unique quality being graded in 6 days to one to_user === pauze
 * max 5 graded different qualities per 6 days from one user to unique other
 * max 15 searches per day per user
 * max 25 projects per year per user
```