采用（练习）restful接口设计规范
在设计接口的过程中，遇到一个问题，就是数据库接口地址和静态页面请求地址无法区分的情况，解决这个问题其实很简单，就是完全按照前后端分离的规范，将前端页面放到一个前端服务器上。所以这里规定，前端页面服务器端口用:3000，后端服务器用端口:5000。

1. 注册

   1. 请求注册页：GET :3000/signup

URL：

    `/signup`

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

   2. 注册（包含上传头像）：POST :5000/signup

URL：

    `/signup`

请求类型：

    'POST'

传入参数：

    {
      username: string, 必须
      password: string, 必须
      avatar: string,  非必须
      nickName: string  必须
    }

返回参数：

    {
      message:0 用户已存在|1 注册成功|2 数据库错误
    }



3. 登录
   1. 请求登录页：GET :3000/signin
请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

   2. 登录：POST :5000/signin
请求类型：

    'POST'

传入参数：

    {
      username: string, 必须
      password: string  必须
    }

返回参数：

    {
      message:0 用户不存在|1 密码错误|2 登录成功
    }

5. 登出：GET :5000/signout

URL：

    /signout

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

6. 查看文章
   1. 所有文章列表：GET :5000/posts
URL：

    /posts

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   2. 请求个人主页：GET ：3000/home?author=xxx

URL：

    /home?author=xxx

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   3. 查看一篇文章（包含留言）：GET  :3000/posts/:postId

URL：

    /posts/:postId

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

7. 发表文章
   1. 请求发表文章页：GET :3000/posts


URL：

    /posts

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   2. 发表文章：POST 5000:/posts

URL：

    /posts

请求类型：

    'POST'

传入参数：

    {
      title:string, // 必须
      content: string, //必须
      author: string //必须
    }

返回参数：

    N/A

8. 修改文章
   1. 修改文章页：GET 3000:/posts/posts/:postId


URL：

    /posts/:postId

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   2. 修改文章：POST :5000/posts/:postId


URL：

    /posts/:postId

请求类型：

    'PUT'

传入参数：

    N/A

返回参数：

    N/A


9. 删除文章： :5000/posts/:postId
URL：

    /posts/:postId

请求类型：

    'delete'

传入参数：

    N/A

返回参数：

    N/A

10. 留言
   1. 创建留言：POST :5000/comments
URL：

    /comments

请求类型：

    'POST'

传入参数：

    {
      authorId:string, //必须
      comment:string //必须
    }

返回参数：

    N/A


   2. 删除留言： :5000/comments/:commentId
URL：

    /comments/:commentId

请求类型：

    'DELETE'

传入参数：

    {
      commentId
    }

返回参数：

    N/A


3. 获取所有评论：GET :5000/comments
URL：

    /comments

请求类型：

    'GET'

传入参数：

    {
      authorId:string, //必须
      comment:string //必须
    }

返回参数：

    N/A

3. 获取相应文章评论：GET :5000/comments/postId

URL：

    /comments

请求类型：

    'GET'

传入参数：

    {
      authorId:string, //必须
      comment:string //必须
    }

返回参数：

    N/A
