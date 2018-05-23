/* eslint-disable */
$(() => {
  // $.ajax({
  //   url: 'http://127.0.0.1:5000/signup',
  //   type: 'POST',
  //   success (data) {
  //     console.log(data)
  //   }
  // })
  // $.ajax({
  //   url: 'http://127.0.0.1:5000/signout',
  //   type: 'GET',
  //   success (data) {
  //     console.log(data)
  //   },
  //   beforeSend () {
  //     console.log('ready');
  //   }
  // })
  // $.ajax({
  //   url: 'http://127.0.0.1:5000/posts',
  //   type: 'GET',
  //   success (data) {
  //     console.log(data)
  //   }
  // })
  // $.ajax({
  //   url: 'http://127.0.0.1:5000/comments',
  //   type: 'GET',
  //   success (data) {
  //     console.log(data)
  //   }
  // })

  $('#signout').on('click', () => {
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: 'get',
      url: 'http://127.0.0.1:5000/signout',
      success (data) {
        if (!data.isLogin) location.href = '/public/login.html'
      }
    })
  })
  let footerTMP = template('footerTmp', { // 这里的名字虽然时id，但是不要写#
    time: (new Date()).getFullYear()
  }) 
  $('.footerBox').html(footerTMP)

  let latestPostTmp = template('latestPostTmp', {}) 
  $('.latestPostsBox').html(latestPostTmp)

  let profileTmp = template('profileTmp', {}) 
  $('.profileBox').html(profileTmp)

  let commentsTmp = template('commentsTmp', {})
    $('.commentsBox').html(commentsTmp)
})
