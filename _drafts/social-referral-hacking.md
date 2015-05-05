---
layout: post
title: Social referral hacking
date: 2015-05-02 01:41
comments: true

---

## What the heck is social referral hacking?

Every pre-product launch or beta invitation these days has a some sort of social
referral program.  I'm talking about those cliched waiting lists that give your
online friends and followers another reason to hate you.  But it turns out most
of these referral programs are really easy to game, and I've been first in line
for the ones I care about.

I got a free five year membership to [Jet](//jet.com), scored a really early
invite to [Robinhood](//robinhood.com) by jumping from position 300k to the top
100, and climbed the ranks to number eight on [Final](//getfinal.com). Do I
really have that many friends?

I definitely didn't lose any friends from some sort of shamless referral begging
that most people probably resort to. I'd say I've even gained one. After jumping
my way to number eight on Final, I got an email from Aaron, the CEO. But it
wasn't an email scolding me for hacking their system, but rather one thanking me
for my enthusiam.  "Hacking" is probably the wrong term to use though. Aaron
calls them (me) spammers - and around 20% of their submissions consist of fake
referrals. I learned this at Final headquarters in Mountain View, since Aaron
invited us over to practice for our YC interview. They used to try and block
these spammers by requiring tokens, but ultimately decided fake referrals
weren't really hurting them anyways.  Your numbers look a little higher *and*
you have the emails of people who *really* want to use your product. These are
lighthouse customers that are die-hard enough to spend time testing shitty beta
releases all because they like being on the "cutting edge". Yes, I'm one of
these people and will occasionally flip shit over new product releases if the
use cases are appealing enough.

## Let's get to hacking... err - spamming?

So how did I do it? You'll see why this really should be called spamming rather
than hacking.

For any site that allows you to invite others with email, most don't actually
sanitize the email addresses completely.

Talk about emails and + here. They don't check for duplicates, so it's easy to
send yourself links instead of having to create a bunch of accounts.

{% highlight bash %}
#!/bin/bash
for i in `seq 121 160`;
  do
    echo $i
    CMD="curl -X POST -H \"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\" -H \"Origin: https://www.getfinal.com\" -H \"User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36\" -H \"Content-Type: application/x-www-form-urlencoded\" -H \"DNT: 1\" -H \"Referer: https://www.getfinal.com/?ref=vfwVXDlN\" -H \"Accept-Encoding: gzip, deflate\" -H \"Accept-Language: en-US,en;q=0.8\" -H \"Cookie: optimizelyEndUserId=oeu1429742934290r0.02853874070569873; _gat=1; email=BAhJIhdwZmlzdGErbUBnbWFpbC5jb20GOgZFVA%3D%3D--cc5afb416729149cf55faf3c947cb68db3d257ad; private_hash=BAhJIik2MjQxMWFjNy00YWE4LTQ2N2EtODk0NS01YTJiMGMyZDg0MzAGOgZFVA%3D%3D--cd9b3bc8891bdac381a9ba6894558c92ead1bf3d; _final-email-signup_session=cmRHaUJvVDV3VGtZV1c5Vi9TMmZ3TDV0cm9JYTgvL2xsaVpmZGUrc2pmY1EybnMxNmV2L1lickp4TFQza0hyUWhHS25TRVhHZ3pRdDNsOHkyQktRbkRQT2Vob2ZNdWgxSVZBbzFBRzV6amtNTTgzVVByck4zNTQxMmZXU2h4SDJ6dDM2NG00bjFXZlFHSVhxVDJ5aDc4WUJGWW81dndiSGxZK2U3ZzR0Z2x3Zm5ITkdhR00vaDU4enBvZHpRMlRseUdvWTBnSTlCTm4vRW81SXgzeUVOYlJsWERFOVM3ZDdNUEtGbGxsMUoyT0hnWUtXRldPRVlwWGszNjg2ZEsyRUJxVHZkMW5vQWo3VnRrTld2bko4T3RtYW01Tk5SNTJ4RWJTTFdKMm5uUlE9LS1hVjRWSUIvQzBITkFnS3dnWGtXUlBnPT0%3D--b02ab8e7d450973fe2ebb2896ffbc8ee5bea4c3b; __ar_v4=7CZ27YDQIZDBVNXQ5YX4TB%3A20150422%3A16%7C7YKTCUOZHVHURAMJ74BJJ6%3A20150422%3A16%7CHCSKKTEZKBBJDI2Z4ATMLA%3A20150422%3A16; optimizelySegments=%7B%221810210598%22%3A%22referral%22%2C%221810400202%22%3A%22gc%22%2C%221820900169%22%3A%22false%22%7D; optimizelyBuckets=%7B%222642140062%22%3A%222635880229%22%7D; _ga=GA1.2.1348008511.1429742935; optimizelyPendingLogEvents=%5B%5D\" -H \"Cache-Control: no-cache\" -d 'signup%5Bemail%5D=traeko%2B$i%40gmail.com&signup%5Bshare_hash%5D=vfwVXDlN&subscribe=' https://apply.getfinal.com/signups"
    echo $CMD
    eval $CMD
  done  
{% endhighlight %}
