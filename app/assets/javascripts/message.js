$(function() {

  function buildHTML(message) {
    if (message.content && message.image ) {
      var html = `<div class="message">
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
    var html = `<div class="message">
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
      var html = `<div class="message">
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
    console.log(formData);
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
      console.log("ok")
      var html = buildHTML(message);
      console.log(html);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
  
});