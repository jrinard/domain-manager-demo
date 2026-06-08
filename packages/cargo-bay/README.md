# Cargo Bay

Client-side Storage interfaces for persisting data. This is currently an "unmanned" cargo bay ("storage on the honor system" - Austin)
Our intention is for it to be a "manned" cargo bay except for `SessionHandling`

## Auth Storage (Manned)

`SessionHandling` is a wrapper around how we store authentication tokens and base user information (e.g. user id)

Auth Storage depends on `BrowserStorage` (Short-Term) as it uses it to store data.

<hr/>
<br/>

## Tools (Unmanned)

### Small Storage

`BrowserStorage`
Opinionated client-side storage. Intentionally for now, the Cargo Bay only has specifics spots for certain data.  

### Large Storage

`SystemStorage` is used for storing HTTP Tyto endpoint responses for performance reasons
