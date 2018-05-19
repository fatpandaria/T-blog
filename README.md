如果先在github创建一个repo，然后clone到本地，然后再push之类的操作不会遇到下面我遇到的问题，但是我通过的是先在本地创建一个git仓库，然后再github创建一个repo，然后通过`$ git remote add origin git@github.com:fatpandaria/T-blog.git`，然后`$ git push -u origin master`，
会报错`error: failed to push some refs to 'git@github.com:fatpandaria/T-blog.git'
hint: Updates were rejected because the tip of your current branch is behind`，这是因为没有git pull，一般进行push要先进行pull，获取仓库里的更新。然后又会报一个错`There is no tracking information for the current branch.
Please specify which branch you want to merge with.`，按照git的提示进行设置就好了，`git branch --set-upstream-to=origin/master master`，这样设置以后进行git pull了，还会遇到一个错误`fatal: refusing to merge unrelated histories`，通过下面这个指令`git pull origin master --allow-unrelated-histories`，就可以完成 git pull，最后终于可以进行git push了。


这一切都是因为通过git clone时，会自动进行`branch tracking` 设置。over


