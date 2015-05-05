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
referrals. I learned this at Final headquarters in Mountain View, as Aaron
had invited us over to practice for our YC interview. They used to try and block
these spammers by requiring tokens, or email verification, but ultimately
decided fake referrals weren't really hurting them anyways.  Your numbers look a
little higher *and* you have the emails of people who *really* want to use your
product. These are lighthouse customers that are die-hard enough to spend time
testing shitty beta releases all because they like being on the "cutting edge".
Yes, I'm one of these people and will occasionally flip shit over new product
releases if the use cases are appealing enough.

## Let's get to hacking... err - spamming?

In Final's case, their signup system is so lax you could just sit there and
sign up randomly generated emails with your original referral code with no
problem at all. Robinhood required email verfication (clicking links after
signup) and also required me to send a session token.

According to [RFC 2822](http://tools.ietf.org/html/rfc2822#section-3.4.1), the
"local-part" of the email address (the portion before the @ sign) is 
interpreted arbitrarily by the host. Many sites over-sanitize email addresses,
disallowing many ascii characters that are actually perfectly valid. 

What's important is the concept of subaddressing: 

>
     Subaddressing is the practice of augmenting the local-part of an
     [RFC2822] address with some 'detail' information in order to give
     some extra meaning to that address.  One common way of encoding
     'detail' information into the local-part is to add a 'separator
     character sequence', such as "+", to form a boundary between the
     'user' (original local-part) and 'detail' sub-parts of the address,
     much like the "@" character forms the boundary between the local-part
     and domain.

This flexibility was created to help users file emails from specific sites and
mailing lists. That way, if you make an account on somesellout.com with
`youremail+somesellout@mail.com`, when you start getting loads of unwanted
messages at that address you know who sold your information to spammers.

The other nice thing about subaddressing is that you can use it to refer
yourself, to yourself. 

Most sites I've encountered so far allow subaddressing, since they are valid
email addresses and all. More importantly, they treat subaddressed emails as
*unique* addresses. For example, if the target email you want to move up to
first place in line is `foo@bar.com`, then you can sign up `foo+baz@bar.com`
through `foo@bar.com`'s referral code, and both addresses will be considered
unique and valid. This means that when referring myself, I don't have to have
hundreds of fake email accounts set up. 

With that in mind, now all you have to do is find the endpoint for the signup
page, and write a script that makes a bunch of POST requests with uniquely
subaddressed emails, being sure to pass the correct headers so that your
"target" email will actually get referral credits.

{% highlight bash %}
#!/bin/bash
for i in `seq 121 160`;
  do
    echo $i
    CMD="curl -X POST -H \"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\" -H \"Origin: https://www.getfinal.com\" -H \"User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36\" -H \"Content-Type: application/x-www-form-urlencoded\" -H \"Referer: https://www.getfinal.com/?ref=vfwVXDlN\" -H \"Accept-Encoding: gzip, deflate\" -H \"Accept-Language: en-US,en;q=0.8\" -d 'signup%5Bemail%5D=traeko%2B$i%40gmail.com&signup%5Bshare_hash%5D=vfwVXDlN&subscribe=' https://apply.getfinal.com/signups"
    echo $CMD
    eval $CMD
  done  
{% endhighlight %}
