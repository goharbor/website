---
title: "Contributing to Harbor 101"
author:
    name: "Harbor Maintainers"
description: "How to get involved with Harbor"
date: 2018-10-04T12:00:00+04:00
draft: false
showPageInfo: true
---

We're elated at the increased community involvement since the donation of
Harbor to the Cloud Native Computing Foundation. There's lots of interest
around the project, including a steady buzz of activity in our Slack channels
and on GitHub.

This blog post is for those interested in contributing to a CNCF project that
may not have much experience with the various steps involved. We're a friendly
bunch of developer and the best part of our work on Harbor is interacting with
the community!

Contributing to an open source project can initially seem daunting. If you're
feeling like there are "more qualified" individuals to hop in and help, we've
all been there.  We all start somewhere and the great thing about open source
-- including and especially Harbor -- is that this is a no-judgement
community.  We welcome contributors with all sorts of experiences and
backgrounds, from well-spoken writers eager to make our documentation clearer,
to bug hunters that are talented at finding the most obscure corner cases, to
life-long developers that have been hacking at code for decades -- we
appreciate *ALL* contributions.

The topic of contributing to an open source project is vast, particularly
with a project like Harbor that has lots of moving parts. This will be the
first of (hopefully) several posts where we discuss how to dive into the
project and help. I'll make an effort to be both succinct and practical --
please feel free to fork the repo and follow along with the blog post.

The only thing that might help in following along is a bit of experience with
Git. Fortunately there are some tremendous 
[resources](https://git-scm.com/book/en/v2) available for learning Git to
varying degrees of interest. GitHub also has some good documentation that
describes the various steps involved in the contribution process, and I'll
link to those as appropriate. Because Harbor is hosted on GitHub,
understanding [GitHub flow](https://guides.github.com/introduction/flow/) will
make things much simpler as we tackle our first contribution. Read through
this [quick tutorial](https://guides.github.com/introduction/flow/) and make
sure you grasp the basic concepts before moving forward. If you have
questions, ping us
on Slack. :)

## Forking the repo
Let's start with the first step in any contribution to Harbor: forking the repo. 
GitHub has a [great page](https://help.github.com/articles/fork-a-repo/) that
describes _how_ and _why_ we fork and, as described in said page, this is the
first step, whether contributing docs, tests or code.

![Forking the
repo](https://help.github.com/assets/images/help/repository/fork_button.jpg).

Congrats -- you're half way there!

### Hunting for Things to Improve
Now comes the fun part: finding something to improve. A good starting place
is documentation.

Docs are the easiest place to start making contributions, if only because
there's minimal cognitive overhead involved when updating documentation.
There's _always_ room to improve documentation: cleaning up dead links, fixing
typos, clarifying content and instructions, and creating new documentation to
make things clearer for users of the Harbor platform.

### Creating a Branch
As is discussed in the GitHub flow
[tutorial](https://guides.github.com/introduction/flow/) and the [Open Source
guide](https://opensource.guide/how-to-contribute/#finding-a-project-to-contribute-to),
creating a branch is the first step in the process. Branches are used as
"sandboxes" where your proposed changes are located. In general, creating
a branch is as easy as this:

`$ git checkout -b doc-improvements`

### Preparing to Make Changes (to your fork)
The [previously-referenced](https://help.github.com/articles/fork-a-repo/)
GitHub documentation describes the various steps involved, but for
completeness we'll discuss here:

Critically, make sure you're still in the right branch:

`$ git status`

The first line of the status output should show that you're in your feature
branch, in our case `doc-improvements`. Still with me?

#### Improving the Docs
Fire up your favorite text editor -- VSCode, Atom, vim, emacs, even nano(!) --
and open the doc file you'd like to improve. Update the documentation as
appropriate, save it and then get ready to push it to your Harbor fork.

From a terminal, a `git status` will show you what file you've just edited.
Make sure this looks right.

I'll also operate under the assumption that you've set up `git` properly --
specifically `user.name` and `user.email`. If in doubt, take a look at
[this](https://help.github.com/articles/setting-your-commit-email-address-in-git/)
doc _first_. This is important because it ensures that the changes you make
are properly attributed to _you_!


#### Committing and Pushing Changes
The next (almost there!) step is to commit the changes in your branch and push
upstream:

```
$ git commit --verbose --signoff --message="Updating documentation to improve
<something>"
$ git push --set-upstream origin <my_branch_name>
```

The `push` command will take your changes and push it to your fork of the
Harbor repo. Now we're ready to create a Pull Request.


#### Creating a Pull Request
This is perhaps the easiest part of the process. Head over to your fork on
GitHub:
[https://www.github.com/<your_username>/harbor]()https://www.github.com/<your_username>/harbor).

A banner at the top of the repo will present you with the option of [creating
a pull request](https://help.github.com/articles/creating-a-pull-request/).

![Creating a Pull
Request](https://help.github.com/assets/images/help/pull_requests/pull-request-review-edit-branch.png)

Make sure the "base" branch is `master` in the `goharbor` organization. This
tells GitHub to compare your changes (in your branch) to the upstream Harbor
repository.


#### Sit Back and Relax
Won't be long before we take a look at your Pull Request. Often there are
minor suggestions along the way to make sure things are accurate, but this is
the fun part of open source: collaboration!

The Pull Request is very much a "live conversation." Minor issues will likely
be accepted in short order, while larger (perhaps more impacting changes)
might result in a discussion. We don't bite, though, so please don't be
timid: share your opinions, thoughts and feel free to (nicely) push back as
appropriate. We make mistakes, too.


#### In Closing
I'll follow-up with future blog posts with further discussion on how to
contribute to Harbor. Contributing code can be more involved, particularly if
the feature is large, but we encourage you to join the fun.  You can find us
on [GitHub](https://github.com/goharbor), [Slack](https://cloud-native.slack.com/messages/harbor),
or on the [harbor-users](https://lists.cncf.io/g/harbor-users) and [harbor-dev](https://lists.cncf.io/g/harbor-dev)
mailing lists.

Thanks for reading!
