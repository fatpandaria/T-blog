如果先在github创建一个repo，然后clone到本地，然后再push之类的操作不会遇到下面我遇到的问题，但是我通过的是先在本地创建一个git仓库，然后再github创建一个repo，然后通过`$ git remote add origin git@github.com:fatpandaria/T-blog.git`，然后`$ git push -u origin master`，
会报错`error: failed to push some refs to 'git@github.com:fatpandaria/T-blog.git'
hint: Updates were rejected because the tip of your current branch is behind`，这是因为没有git pull，一般进行push要先进行pull，获取仓库里的更新。然后又会报一个错`There is no tracking information for the current branch.
Please specify which branch you want to merge with.`，按照git的提示进行设置就好了，`git branch --set-upstream-to=origin/master master`，这样设置以后进行git pull了，还会遇到一个错误`fatal: refusing to merge unrelated histories`，通过下面这个指令`git pull origin master --allow-unrelated-histories`，就可以完成 git pull，最后终于可以进行git push了。


这一切都是因为通过git clone时，会自动进行`branch tracking` 设置。over


## 踩过的一些坑

1. 做这个项目时，遇到的第一个比较严重的坑就是，在设置数据库时（SQLyog 图形界面），没有设置正确的数据库字符集，整个数据库默认的就是latin，结果导致后面建的表和列里面的字符集都是latin，以至于每次传入汉字的时候，都会报wrong string的错误，后来虽然我意识到了这个问题，修改了数据库和表的字符集，可是并没有看到修改列的字符集的选项（hide language options，这个选项被选中了），结果列的设置还是latin，后来我用phpadmin看了一下数据库的结构才发现这个问题，所以将列的字符集也修改成utf8（随便哪一种）就搞定了。然后在搜索答案的过程中，我发现了，一些存入emoji报错的问题，解决方案时把字符集设置为utf8mb4,以提高兼容性，因为emoji占3个字节？记不太清了
2. 第二个bug就是，使用config-lite的时候，mySQLOptions写成了MySQLOptions，看了半天没发现，结果每次数据库都是没设置成功的，导致session没法存入到数据库
3. 第三个坑呢，就是比较高级一点的坑，由于我采用的前后端代码分离的写法，后端用5000端口，前端用3000端口，然后用ajax去调用后端的api，这样的一个结果就是，前端ajax默认不会发送cookie（安全性考虑），然后登录的状态没法在后台被验证，所以每次都是未登录登录，所以需要设置选项`xhrFields: { withCredentials: true},` 因为这个设置，服务器端就不能用cors（）的默认选项了，因为它默认设置Access-Control-Allow-Origin:*,不能设置为*，需要自定义设置白名单，然后这个设置后，还需要设置服务器端Access-Control-Allow-Credentials=true，当然这两个选项都已经被cors模块简化了，只需要设置 `let corsOptions = {  origin: 'http://127.0.0.1:3000',  credentials: true}` 然后cors(corsOption) 传入这个参数即可。





