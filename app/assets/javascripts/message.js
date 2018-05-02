$(function(){
  function buildHTML(message){
    var html = `<div class="message-zone__message">
                  <div class="message-zone__message__member">
                    <span>
                      ${message.user.name}
                    </span>
                  </div>
                  <div class="message-zone__message__date">
                    <span>
                      ${dateToFormatString(message.created_at, '%YYYY%年%MM%月%DD%日 (%w%) %HH%時%mm%分%ss%秒')}
                    </span>
                  </div>
                  <div class="message-zone__message__text">
                    <span>
                      ${message.content}
                    </span>
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
      $('.message-zone').append(html)
      $('.send-message-zone__input').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
