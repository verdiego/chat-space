$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      var image;
      $(function() {
        message.image.url != null ? image = `<img class='.message-zone__message__text' src=" ${message.image.url} " alt=" ${message.image.url} ">` : image = ``
      });
      var html = `<div class="message-zone__message" data-id="${message.id}">
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
        $('#new_message')[0].reset();
        $('.send-message-zone__send').prop('disabled',false);
        $('.message-zone').animate({scrollTop: $('.message-zone')[0].scrollHeight}, 'slow');
      })
      .fail(function(){
        alert('error');
      })
    })
  });
  $(function(){
    function buildMessage(message) {
      var messages =` <div class="message-zone__message" data-message-id="${message.id}">
                        <div class="message-zone__message__member">
                          <span>
                          ${message.user_name}
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
                        </div>
                      </div>`
      $('.message-zone').append(messages);
    };

    $(window).bind("load", function(){
      if(document.URL.match(/..messages/)) {
        $(function(){
          setInterval(update, 5000);
        });
      }
    });
    function update(){
      if($('.message-zone__message')[0]){
        var message_id = $('.message-zone__message:last').data('message-id');
      } else {
        var message_id = 0
      }
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {
          id: message_id
        },
        dataType: 'json'
      })
      .always(function(new_message){
        $.each(new_message, function(i, new_message){
          buildMessage(new_message);
          $('.message-zone').animate({scrollTop: $('.message-zone')[0].scrollHeight}, 'slow');
        });
      });
    }
    clearInterval();
  });
});
