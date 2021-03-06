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
    constraints,                            DONE
    settings,                               DONE
    admin,
    ads,
    payments,
    mail if comment,
    confirmation mail,
    rules,                                  PARTLY DONE
    positive qualities/adjectives/nouns and projects/references in autocomplete,      DONE
    a few bots,
    handshake,
    texts                                   DONE
}
```

### Micro adaptations
```
- put autocomplete in a component, create own version of vue-multiselect
- constraints of the forms must be copied to firebase database itself, as a redundancy
- try without page refreshes when switching between tabs like messages and explore
- are the firebase database rules ok?
- maybe a log to follow up changing actions when accepting/rejecting messages
- !!! why not ask an acquaintance to grade my quality? !!!
- send a verification email when signing up
- create a loop or listener or so, to check for new messages
- a clause in the license that states that websites that use egoconf, must be available for the general global public
- an autocomplete on the qualities and it's adjectives/nouns
- pagination on messages and history
- lookup send-by-user in messages page instead of showing a hash
- set maxlength of project in modal in explore page
- // once the store:state.messages becomes very large, is this a problem?
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
- for ask feature, enable choosing one or more qualities from the list to present to the person you like to ask, not limiting to one quality
- show the most used qualities above in the list shown when grading someone
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

### Unique value proposition:
```
The MVP as is right now could be expanded in different ways: (I thought already of many ways, I will gradually add to this list)
- a job market, supply and demand, 'who pays the most' vs 'who is the cheapest'. Egoconf results in the knowledge of someones
present abilities, abilities who are quantified. for instance, if you know the areas where two service technicians are
who are valued the same, you know that the one who is close is cheaper.
I see this as an inter-company-like solution aiming for the best and cheapest result which is possible if everyone
in the egoconf ecosystem updates it's qualities and grades appropriately and constantly. In this system you also
know what the qualities are someone likes to be graded, to avoid useless grading of unwanted grades.
- if someone's accountability is at stake, like a journalist, than you're able to measure the reach of this person for a certain quality.
It's amazingly interesting if egoconf wil once able to see overlapping and evolving areas of popularity for certain qualities and people.
This is probably the domain of data scientists and the like ... I'd like to grow ...
The concerned people should be able to follow precisely there interactions and resulting popularity.
- you're able to follow a products worldwide adoption and show ads in regions or to persons who are not yet introduced to the product ...
This is nog a very precise feature, not unique either.
```

### Very long term future features:
```
- egoconf space: space is grading between 0 and 20 on a scale to 20, and accepts also negative adjectives/nouns. The purpose is to form a more complete profile of the person who gives the grade. The introduction of this feature is foreseen when everyone accepts the reality (think of >yr2070) and relativity of oneself's, and the others's, reality, no matter what. So when people are as mature as can be and when their behaviour is as socially accepted by the majority of egoconf's users and the user's surrounding people, always avoiding negative behaviour unless there's an explainable and logic reason, a reason which is accepted by the majority of egoconf's users and the user's surrounding people.
- a p2p distribution of the graded messages (for native mobile apps!). The p2p system might monitor the behavior of the user, but the logs should only be kept in de p2p system, in order to counter privacy concerns. Main reason: reducing costs, firebase isn't cheap. And other than that, p2p is a cool technology. Filecoin is a nice option ...
- introduce 'updateable accountablility' for users in a blockchain, as an alternative for classic privacy. In the classic way you're not much being held accountable for gossiping which could could lead to, wether or not intentional, misleadings. The blockchain makes you accountable, but you can improve or regress so it really needs to be updateable.
- also about privacy and gossiping, people who have some sort of a specialty in gathering information, must be acknowledged and held accountable, to the extent that every specialty and interest should be known and that in a hierarchical way. It's just about fully using hte full potential of people without borders.
- maybe create a stablecoin which is signed by the seller, the buyer and a dozen of 'central bankers', people who are known to be sublime for something in the egoconf community and who are able to securely and independently back a sale through shared knowledge about the sale (in fact a smart contract). This is where I'd like to dive in deeper or explore this path a maximum bit more.
```

### Nouns:
http://forum.castlot.com/archive/index.php/t-296.html