# util-server

a server for frontend utils, like js and css min, ...


## Usage

### min

```bash
# get
$ curl http://localhost:8363/min/https%3A%2F%2Fs.tbcdn.cn%2Fcdnstatus.js

# post
$ curl -d "url=http://a.tbcdn.cn/cdnstatus.js" http://localhost:8363/min

# put
$ curl -X PUT -F "f=@cdnstatus.js" http://localhost:8363/min
```


## LISENCE

(MIT License)

Copyright (c) 2014 ChenCheng sorrycc@gmail.com


