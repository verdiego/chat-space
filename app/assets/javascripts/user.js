$(function(){
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    return $("#user-search-result").append(html);
  }
  function appendNoUser(comment){
    var html = `<div class="chat-group-user clearfix">
                  ${comment}
                </div>`
    return $("#user-search-result").append(html);
  }
  function appendUserToMember(user_name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return $("#user-search-result").append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/user',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if(input.length == 0){
        appendNoUser("");
      }else if (users.length !== 0) {
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
  });

  $('#user-search-result').on('click', ".user-search-add", function(){
    $('#user-search-field').val('');
    var user_id = $(this).data('user-id')
    var user_name = $(this).data('user-name')
    appendUserToMember(user_name, user_id)
    $(this).parent().remove()
  })
  $('#user-search-result').on('click', '.user-search-remove', function(){
      $(this).parent().remove();
  })
});
