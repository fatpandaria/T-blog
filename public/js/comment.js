$(() => {
  // $('#editor').wysiwyg()
  let postId = window.location.search.split('=')[1]
  console.log(postId)
  $('#publishBtn').on('click', () => {
    let formData = new FormData($('#publishForm')[0]) // 选择的元素必须时原生的DOM元素
    console.log($('#publishForm')[0])
    formData.postId = postId
    console.log(formData) // formData 就是看不见
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      url: 'http://127.0.0.1:5000/comments',
      data: formData,
      processData: false,
      contentType: false,
      success (data) {
        if (data.status === 'OMMENTC_SUCCESS') {
          console.log(data)
        }
      }
    })
  })
})

// TODO:
