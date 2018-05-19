采用（练习）restful接口设计规范

1. 注册
   1. 获取注册页：GET /signup

URL：

    `/signup`

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

   2. 注册（包含上传头像）：POST /signup

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
   1. 获取登录页：GET /signin
请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

   2. 登录：POST /signin
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

5. 登出：GET /signout

URL：

    /signout

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

6. 查看文章
   1. 主页：GET /posts
URL：

    /posts

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   2. 个人主页：GET /posts?author=xxx

URL：

    /posts?author=xxx

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   3. 查看一篇文章（包含留言）：GET /posts/:postId

URL：
    /posts?author=xxx

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A

7. 发表文章
   1. 发表文章页：GET /posts/create


URL：

    /posts/create

请求类型：

    'GET'

传入参数：

    N/A

返回参数：

    N/A


   2. 发表文章：POST /posts/create

URL：

    /posts/create

请求类型：

    'POST'

传入参数：

    {
      title:string, // 必须
      content: string, //必须
    }

返回参数：

    N/A

8. 修改文章
   1. 修改文章页：GET /posts/:postId/edit


   2. 修改文章：POST /posts/:postId/edit
9. 删除文章：GET /posts/:postId/remove
10. 留言
   1. 创建留言：POST /comments
   2. 删除留言：GET /comments/:commentId/remove
