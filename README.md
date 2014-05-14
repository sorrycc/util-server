# util-server

a server for frontend utils, like js and css min, ...

## Usage

min by get
```bash
$ curl http://l.alipay.im:8363/min/https%3A%2F%2Fs.tbcdn.cn%2Fcdnstatus.js
```

min by post
```bash
$ curl -d "url=http://a.tbcdn.cn/cdnstatus.js" http://l.alipay.im:8363/min
```

