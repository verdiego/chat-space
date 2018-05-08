$(function(){
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    return $("#user-search-result").append(html);
  }
  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
                  ${user}
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
  })
});
