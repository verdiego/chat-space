$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      var image;
      $(function() {
        if (message.image.url != null) {
          image = "<img class='.message-zone__message__text' src=" + message.image.url + " alt=" + message.image.url + ">"
        }else{
          image = ''
        }
      });
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
                      <p>
                        ${message.content}
                      </p>
                        ${image}
                    </div>
                  </div>`
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
        $('#message_image').val('');
        $('.send-message-zone__send').prop('disabled',false);
        $('.message-zone').animate({scrollTop: $('.message-zone')[0].scrollHeight}, 'slow');
      })
      .fail(function(){
        alert('error');
      })
    })
  });
)};
