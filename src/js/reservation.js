import $ from "jquery";

var node = $(".resFormBody");

function confirmationMsg(){
  return`<span class="Thanks"><h3>Thank you for your reservation!
  We look forward to having you dine with us!</h3></span>`
};

function confirmScreen(data) {
    event.preventDefault();
    $(".resFormBody").html(confirmationMsg)
    $(".resFormFooter").hide();
    return
};

export {confirmScreen};
