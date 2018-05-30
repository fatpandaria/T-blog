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
  
  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    url: 'http://127.0.0.1:5000/posts',
    type: 'GET',
    async: false,
    success (data) {
      let count = 0
      data.forEach((value) => {
        count += value.view_num
      })
      console.log(data)
      let latestPostTmp = template('latestPostTmp', {result:data}) 
      $('.latestPostsBox').html(latestPostTmp)


      let viewNumTmp = template('viewNumTmp', {count:count}) 
      $('#totalView').html(viewNumTmp)

    }
  })

  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    url: 'http://127.0.0.1:5000/posts',
    type: 'GET',
    async: false,
    success (data) {
      let count = 0
      data.forEach((value) => {
        count += value.view_num
      })      
    }
  })

  $.ajax({
    url: 'http://127.0.0.1:5000/comments',
    type: 'GET',
    success (data) {
      console.log(data.message)
      let commentsTmp = template('commentsTmp', {result:data.message})
    $('.commentsBox').html(commentsTmp)

    let cmtNumTmp = template('cmtNumTmp', {result:data.message}) 
    $('#totalComments').html(cmtNumTmp)
    }
  })

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

  let footerTMP = template('footerTmp', { // 这里的名字虽然是id，但是不要写#
    time: (new Date()).getFullYear()
  }) 
  $('.footerBox').html(footerTMP)



})
