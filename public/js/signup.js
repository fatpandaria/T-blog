$(() => {
  $('.signupBtn').on('click', () => {
    let formData = new FormData($('#signupForm')[0]) // 选择的元素必须时原生的DOM元素
    console.log($('#signupForm')[0])
    console.log(formData) // formData 就是看不见
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      url: 'http://127.0.0.1:5000/signup',
      data: formData,
      processData: false,
      contentType: false,
      success (data) {
        if (data.message === '注册成功') location.href = '/public/index.html'
      }
    })
  })
})
