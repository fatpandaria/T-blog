/* eslint-disable */
$(() => {
  console.log(window.location.search)
  let postId = window.location.search.split('=')[1]
  let viewer =JSON.parse(window.localStorage.getItem('viewer')||'{}')
  let html = template('commentTmp',viewer)
  $("#commentHere").html(html)
  // console.log(postId)
  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    type: 'GET',
    url: 'http://127.0.0.1:5000/posts/' + postId,
    processData: false,
    contentType: false,
    async: false,
    success (data) {
      if (data.status === 'GET_ARTICLE_SUCCESS') {
        console.log(data.message[0])
        let html = template('article', data.message[0])
        $('#articleBox').html(html)
      }
    }
  })

  $.ajax({
    xhrFields: {
      withCredentials: true
    },
    type: 'GET',
    url: 'http://127.0.0.1:5000/comments/' + postId,
    processData: false,
    contentType: false,
    async: false,
    success (data) {
      if (data.status === 'GET_COMMENT_SUCCESS') {
        console.log(data.message)
        let html = template('commentListTemp', {result:data.message})
        $('#commentList').html(html)
      }
    }
  })


  $('#commentBtn').on('click', () => {

    let formData = new FormData($('#commentForm')[0]) // 选择的元素必须时原生的DOM元素
    let viewer = {
      viewer: $("[name=viewer]").val() ,
      email: $("[name=email]").val()
    }
    window.localStorage.setItem('viewer', JSON.stringify(viewer))
    // formData.postId = postId
    console.log($('#commentForm')[0])
    console.log(formData) // formData 就是看不见
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      url: 'http://127.0.0.1:5000/comments/' + postId,
      data: formData,
      processData: false,
      contentType: false,
      success (data) {
        if (data.status === 'COMMENT_SUCCESS') {
         console.log('success');
         setTimeout(() => {
          location.reload()
         },1000)
        }
      }
    })
  })
})
