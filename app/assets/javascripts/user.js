$(document).on('turbolinks:load', function(){
  $(function(){
    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                  </div>`
      $("#user-search-result").append(html);
    }
    function appendNoUser(comment){
      var html = `<div class="chat-group-user clearfix">
                    ${comment}
                  </div>`
      $("#user-search-result").append(html);
    }
    function appendUserToMember(user_name, user_id){
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                    <p class='chat-group-user__name'>${user_name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
      $("#chat-group-users").append(html);
    }

    $('#user-search-field').on('keyup', function(){
      var input = $("#user-search-field").val();
      if(input !== "") {
        $.ajax({
          url: '/user',
          type: "GET",
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function(users) {
          $("#user-search-result").empty();
          if(users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            });
          }else {
            appendNoUser("一致するユーザーはいません");
          }
        })
        .fail(function(){
          alert('ユーザー検索に失敗しました');
        });
      }else{
        $("#user-search-result").empty();
      }
    });

    $('#user-search-result').on('click', ".user-search-add", function(){
      $('#user-search-field').val('');
      var user_id = $(this).data('user-id')
      var user_name = $(this).data('user-name')
      appendUserToMember(user_name, user_id)
      $(this).parent().remove()
    })
    $('#chat-group-users').on('click', '.user-search-remove', function(){
        $(this).parent().remove();
    })
  });
  $(function(){
    function buildMessage(message) {
      var messages =` <div class="message-zone__message" data-message-id="10">
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

    $(function(){
      setInterval(update, 5000);
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
  });
});
