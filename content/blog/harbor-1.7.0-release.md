---
title: "Harbor v1.7: hot off the press!"
author:
  name: "Harbor Team"
description: "A fit, finish and polish release just in time for the holidays"
date: 2018-12-19T12:00:00+04:00
draft: false
showPageInfo: true
---

## Announcing the Release of Harbor 1.7!
We’re pleased to announce the release of Harbor 1.7 with lots of under-the-hood
refinements:

### Major Features
Harbor v1.7 brings to fruition a number of features we’ve been working on over
the last three months:

* Image Build History – you can now see the contents of a container image
* Image retagging – the ability to apply a new tag to an image after it has been pushed to Harbor. This is particularly useful in cases where images are being promoted in a CI pipeline to production or when images need to be retagged programmatically, or when a user desires to retag container images to different repositories or projects
* Online garbage collection – Harbor can now clean up deleted images from the backend storage and no longer requires the Harbor stack to be stopped before performing a GC operation. This is tremendous news for those who leverage Harbor in environments with CI pipeline resulting in large image churn
* Support Logger customization – enables the user to customize STDOUT / STDERR / file / DB logger of running jobs
* Polished Helm chart functionality – continuing to polish our Helm chart support and fixing various small bugs around this feature, including:
  * Chart searching included in the global search results
  * Label support in Helm charts
  * Recursive deletion of charts

### Additional Features

We’re always on the lookout for ways to polish the project and we’ve made some
smaller changes in that vein: Tightened container capabilities – minimizing
capabilities when starting containers (principle of least privilege!)

* Bumped Clair version – Harbor now ships with Clair v2.0.7
* Bumped Notary version – Harbor now ships with Notary v0.6.1
* Miscellaneous – support for longer usernames, refactoring our UI code, enabling markdown support in our project description, etc. are all small polish-like changes to the project, but the little things *do* matter :)

We’ve seen a tremendous increase in participation by our community since
becoming a Cloud Native Computing Foundation [incubated
project](https://www.cncf.io/projects/). A special thanks to a number of users
who've spent time working on Harbor and contributing to the project:

* [Brett Johnson](https://twitter.com/brettjohnson008)
* [Christian Witts](https://github.com/ChristianWitts)
* [Jacky Wu](Colstuwjx)
* [Frank Kung](https://github.com/kofj)
* [Jeff Lee Wei Che](https://github.com/jeffweilee)
* [Jeremy Wilken](https://twitter.com/gnomeontherun)
* [Ricardo Katz](https://github.com/rikatz)
* [Shane Utt](https://twitter.com/shaneutt)
* [Stéphane Albert](https://github.com/sheeprine)
* [Touch Ungboriboonpisal](https://github.com/erks)
* [Arkadiy Kraportov](https://github.com/arkadiyk)
* [Chin Zhiqiang](https://github.com/kyrogue)
* [mmpei](https://github.com/mmpei)
* [silenceshell](https://github.com/silenceshell)

## Join the Fun
Many thanks to the community for your continued support! We love contributions
of any kind, including tweaking the documentation, helping others in our
#harbor [Slack channel](https://slack.cncf.io/), adding docs, tests or even
performing code reviews. You can find details on joining us
[here](https://goharbor.io/community/).
