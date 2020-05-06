$(function() {
  console.log(document.location.href)
  function buildHTML(message) {
    if (message.content && message.image ) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__user">
                      <div class="message__user--name">
                        ${message.user_name}
                      </div>
                      <div class="message__user--time" >
                         ${message.created_at}
                      </div>
                    </div>
                    <div class="message__low">
                      <div class="message__low__content">
                        ${message.content}
                      </div>
                      <div class="message__low__content">
                        <img src="${message.image}">
                      </div>
                    </div>
                  </div>`
   }else if (message.content) {
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="message__user">
                    <div class="message__user--name">
                      ${message.user_name}
                    </div>
                    <div class="message__user--time" >
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__low">
                    <div class="message__low__content">
                      ${message.content}
                    </div>
                  </div>
                </div>`
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__user">
                      <div class="message__user--name">
                        ${message.user_name}
                      </div>
                      <div class="message__user--time" >
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__low">
                      <div class="message__low__content">
                        <img src="${message.image}">
                      </div>
                    </div>
                  </div>`
    };
    return html;
  }


  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
        console.log("ok");
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }   
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000); 
  }
});