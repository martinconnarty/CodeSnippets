## Sample
```47.29.201.179 - - [28/Feb/2019:13:17:10 +0000] "GET /?p=1 HTTP/2.0" 200 5316 "https://domain1.com/?p=1" "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36" "2.75"```

## Regex
```^(?<src_ip>[\d\.]+)[^\[]+\[?(?<timestamp>[^\]]+)[^\"]+\"(?<http_method>[\w]+)\s(?<url>[^\s]+)\s(?<http_version>[^\"]+)\"\s(?<http_response>\d+)\s(?<bytes>\d+)\s\"(?<http_referrer>[^\"]+)\"\s\"(?<useragent>[^\"]+)\"```

## Grok (from https://github.com/elastic/examples/blob/master/Common%20Data%20Formats/apache_logs/logstash/apache_logstash.conf)
```'%{IPORHOST:clientip} %{USER:ident} %{USER:auth} \[%{HTTPDATE:timestamp}\] "%{WORD:verb} %{DATA:request} HTTP/%{NUMBER:httpversion}" %{NUMBER:response:int} (?:-|%{NUMBER:bytes:int}) %{QS:referrer} %{QS:agent}```
