# Your Tenant Image

Many of the Adversary in the Middle pages that I've observed utilise a feature which loads the background image of the victim's tenant. As defenders, given we have access to the right type of logs (Web proxy logs with URLs and Referrers) we can do some detections!

An AiTM page will often pull in the image directly from authcdn (https://aadcdn.msauthimages.net/<thisisyourtenantid>/logintenantbranding/0/illustration?ts=<timestamp value>)


# Use an overlay

I would first suggest you use an overlay on your background image - if you can get your users to check the URL every time they see a login page then it might stop a lot of these. Perhaps something like this:

![image](https://github.com/martinconnarty/CodeSnippets/assets/6506886/419c36fb-f913-4c5a-8722-3564fd0a8d9b)

Feel free to steal!

This leads to something like:

![image](https://github.com/martinconnarty/CodeSnippets/assets/6506886/ce007057-5136-4204-8bb7-a507f22b67a8)


# Looking for suspect referrers - for direct access

If we look at the referrers in Web Proxy logs - we will often observe that they are usually legitimate, Microsoft pages such as https://login.microsoftonline.com/

If we see anything else, we should look into it.

```
| tstats `summariesonly` count from datamodel=Web where Web.url="https://aadcdn.msauthimages.net/<thisisyourtenantid>/logintenantbranding/0/illustration?*" AND NOT Web.http_referrer IN ("login.microsoftonline.com/*") by Web.user Web.http_referrer
```

# Look for suspect requests - where it's proxied

In one example of an AiTM page, instead of the victim's browser reaching out directly to the image, the site visited it. However, we could see in the logs the same tenantid. This was unusual and something we could look for:

```
| tstats `summariesonly` count from datamodel=Web where Web.url="*<thisisyourtenantid>*" AND Web.dest!="aadcdn.msauthimages.net" by Web.user Web.dest Web.url
```


_Note:_ With both of these, I would imagine future versions of AiTM kits will adapt accordingly and so the chase will continue. Ensuring users get in the habit of checking the URL bar is going to be far more robust.
