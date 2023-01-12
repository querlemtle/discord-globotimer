# Globotimer
A discord bot for displaying converted local time.

## Commands
### `/timestamp [date] [message] [index]`

  Replies timestamp in corresponding local time or insert the timestamp into given message.

  - date: The date to parse.
  - message: Optional. The message to insert timestamp and reply with.
  - index: Optional. Deciding where to insert the timestamp into the custom message. The index starts at zero.

### `/convert [date] [target]`

Convert date from one timezone to the other.

  - date: The date that needs to be converted.
  - target: The target timezone to convert into.