$(() => {
  // $('#editor').wysiwyg()

  $('#publishBtn').on('click', () => {
    let formData = new FormData($('#publishForm')[0]) // 选择的元素必须时原生的DOM元素
    console.log($('#publishForm')[0])
    console.log(formData) // formData 就是看不见
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      url: 'http://127.0.0.1:5000/posts',
      data: formData,
      processData: false,
      contentType: false,
      success (data) {
        if (data.status === 'PUBLISH_SUCCESS') {
          console.log('文章发表成功，3秒后跳转回主页')
          setTimeout(() => {
            location.href = '/public/index.html'
          }, 3000)
        }
      }
    })
  })
})
