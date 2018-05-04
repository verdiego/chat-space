$(function(){
  function buildHTML(message){
    console.log($('.message-zone').height());
    if (message.image.url != null) {
      console.log(message.image);
      var html = `<div class="message-zone__message">
                    <div class="message-zone__message__member">
                      <span>
                        ${message.user.name}
                      </span>
                    </div>
                    <div class="message-zone__message__date">
                      <span>
                        ${message.created_at}
                      </span>
                    </div>
                    <div class="message-zone__message__text">
                      <span>
                        ${message.content}
                      </span>
                      <img class=".message-zone__message__text" src="${message.image.url}" alt="${message.image}">
                    </div>
                  </div>`
    }else{
      var html = `<div class="message-zone__message">
                    <div class="message-zone__message__member">
                      <span>
                        ${message.user.name}
                      </span>
                    </div>
                    <div class="message-zone__message__date">
                      <span>
                        ${message.created_at}
                      </span>
                    </div>
                    <div class="message-zone__message__text">
                      <span>
                        ${message.content}
                      </span>
                    </div>
                  </div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-zone').append(html);
      $('.send-message-zone__input').val('');
      $('.send-message-zone__send').prop('disabled',false);
      $('.message-zone').animate({scrollTop: $('.message-zone')[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('error');
    })
  })
});
