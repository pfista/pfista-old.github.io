---
layout: post
title: Even easier ssh with ssh-copy-id
comments: true
categories: code
---

There's an awesome unix utility called `ssh-copy-id` that installs your public
key into a remote machine's authorized_keys file.  Before I knew it existed, I
was constantly looking up the command I outlined in my previous post
[here](/code/2013/08/08/seamless-ssh-aliases-and-passwordless-login.html).

If you're using OSX you can install it through homebrew `brew install
ssh-copy-id`.  

Use the `-i` flag to specify what identify file you want to be copied.

{% highlight bash %}
ssh-copy-id -i ~/.ssh/id_rsa.pub some_server
{% endhighlight %}

This is way better than how I used to do it:
{% highlight bash %}
cat ~/.ssh/id_rsa.pub | ssh home 'cat >> ~/.ssh/authorized_keys'`). 
{% endhighlight %} 

When you don't give a specific identity file with `-i`, ssh-copy-id will try to
login with each key that is output by `ssh-add -L` and add the ones that fail to
the `authorized_keys` file on the remote host. 

You can see what will happen without making any changes by doing a dry run with
the `-n` flag.

{% highlight bash %}
ssh-copy-id -n some_server
{% endhighlight %}
