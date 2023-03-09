# Globotimer
A discord bot for local time conversion and setting up timers.

## Commands
### `/timestamp [date] [message] [index]`
Replies timestamp in corresponding local time or insert the timestamp into given message.

  - date: The date to parse.
  - message: Optional. The message to insert timestamp and reply with.
  - index: Optional. Deciding where to insert the timestamp into the custom message. The index starts at zero.

  Example: 
  ```
  /timestamp 2023-02-20 21:00 est Movie night will be held at ! 6
  ```

### `/convert [date] [tzname]`
Convert date from one timezone to the other.

  - date: The date that needs to be converted.
  - tzname: The target timezone name to convert into. The target timezone needs to follow tz database names: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

Example:
```
/convert 2023-02-20 09:00 est Europe/Oslo
```

### /addtimer [eventname] [date]
Create a new event reminder.

  - eventname: The name of the event.
  - date: The date of the event.

Example: 
```
/addtimer Boss raid 2020-07-15 20:00 gmt
```
    
### `/deltimer [eventname]`
Delete the event timer by name.

  - eventname: The name of the event.

Example:
```
/deltimer birthday party
```

### `/updatetimer [oldname] [newname]`
Update the event timer name.

  - oldname: The current event name.
  - newname: The updated event name.

Example: 
```
/updatetimer meetup karaoke
```

### `/findtimer [eventname]`
Find the specific timer by event name.

  - eventname: The name of the event.

Example:
```
/findtimer Boss raid
```

### `/help`
List all available commands and options.
