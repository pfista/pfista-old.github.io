---
layout: post
title: Social referral hacking
comments: true
bg: "/img/poly.jpg"

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

![Social Referral](/img/social-referral-hacking/thanks-signup.jpg){: .center-image .shrink-75 }

I definitely didn't lose any friends from some sort of shameless referral begging
that most people probably resort to. I'd say I've even gained one. After jumping
my way to number eight on Final, I got an email from Aaron, the CEO. But it
wasn't an email scolding me for hacking their system, but rather one thanking me
for my enthusiam.  "Hacking" is probably the wrong term to use though. Aaron
calls them (me) spammers - and a decent minority of their submissions consist of
fake referrals. I learned this at Final headquarters in Mountain View, as Aaron
had invited my team over to practice for an important interview. They used to
try and block these spammers by requiring tokens, or email verification, but
ultimately decided fake referrals weren't really hurting them anyways.  Your
numbers look a little higher *and* you have the emails of people who *really*
want to use your product. These are lighthouse customers that are die-hard
enough to spend time testing shitty beta releases all because they like being on
the "cutting edge." Yes, I'm one of these people and will occasionally flip
shit over new product releases if the use cases are appealing enough.

## Let's get to hacking... err - spamming?

Final's signup system is the most permissive I've encountered so
far. You can sign up randomly generated emails with your original referral code,
and no email confirmation is required. That's great and all, but I've got better
things to do than come up with fake email addresses. Robinhood required email
verification (clicking links after signup) and also required me to send a
session token. 

According to [RFC 2822](http://tools.ietf.org/html/rfc2822#section-3.4.1), the
"local-part" of an email address (the portion before the @ sign) is 
interpreted arbitrarily by the host. Many sites over-sanitize email addresses,
disallowing many ascii characters that are actually perfectly valid. 

What's important is the concept of subaddressing: 


> Subaddressing is the practice of augmenting the local-part of an
[RFC2822] address with some 'detail' information in order to give some extra
meaning to that address.  One common way of encoding 'detail' information into
the local-part is to add a 'separator character sequence', such as "+", to form
a boundary between the 'user' (original local-part) and 'detail' sub-parts of
the address, much like the "@" character forms the boundary between the
local-part and domain.

This flexibility was created to help users file away emails from specific sites
and mailing lists. That way, if you make an account on somesellout.com with
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
hundreds of fake email accounts set up if email verification is required. 

With that in mind, all that's left to do is find the endpoint for the signup
page and write a script that makes a bunch of POST requests with uniquely
subaddressed emails, being sure to pass the correct headers so that your
"target" email will actually get referral credits.

Open up chrome dev tools, choose the "Network" tab, and click the "Preserve Log"
checkbox. Then fill in your target email and sign up.

You'll have to find the POST request that hits the signup endpoint. Chrome Dev
Tools has a nice feature that allows you to right click the request and "Copy as
cURL." This will come in handy for generating all the referrals.

![chrome dev tools](/img/social-referral-hacking/chrome-tools.jpg){: .center-image .shrink-50 }


I've removed a lot of headers from the curl request below for readability's
sake.

{% highlight bash %}
curl -X POST -H "Origin: https://www.michaelpfister.com" -H "Referer: https://www.michaelpfister.com/?ref=foo@baz.com" -d 'signup%5Bemail%5D=foo%40baz.com' https://signup.michaelpfister.com/signups"
{% endhighlight %}

In this case, the site required `x-www-form-urlencoded` encoded data of the new
email address to sign up, which is included after the `-d` flag. 

From here on out, you can just generate a script to hit the signup endpoint with
a bunch of subaddressed emails. You'll have to check on a case by case basis for
each site, because they all have their unique way of applying referrals. In this
example, the important part is the data we're sending with the `-d` flag, and
the referral URL passed in the `Referer` header.  Notice the `$i` variable after
the `-d` flag.

{% highlight bash %}
#!/bin/bash
for i in `seq 1 100`;
  do
    CMD="curl -X POST -H \"Origin: https://www.michaelpfister.com\" -H \"Referer: https://www.michaelpfister.com/?ref=foo@baz.com\" -d 'signup%5Bemail%5D=foo%2B$i%40baz.com' https://signup.michaelpfister.com/signups"
    eval $CMD
  done  
{% endhighlight %}

I know this isn't the prettiest way of automating curl requests, and it doesn't
answer a lot of questions. How would you automate for sites that require email
confirmation? What if unique session tokens are required? Most of these problems
are solvable, but the effort required to overcome them only eats into the time
you saved from not spamming your friends.

Now that everyone can be in first place, no one will be. Hopefully we will find
more effective ways of building hype for new products without forcing people to
share things with their friends before they even know if they like the product
or not.
