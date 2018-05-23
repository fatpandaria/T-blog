$(() => {
  $('.signinBtn').on('click', () => {
    let formData = new FormData($('#signinForm')[0]) // 选择的元素必须时原生的DOM元素
    console.log($('#signinForm')[0])
    console.log(formData) // formData 就是看不见
    $.ajax({
      contentType: false,
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      url: 'http://127.0.0.1:5000/signin',
      data: formData,
      processData: false,
      success (data) {
        if (data.isLogin) {
          location.href = '/public/index.html'
        }
      }
    })
  })
})
