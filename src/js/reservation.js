import $ from "jquery";

var node = $(".resFormBody");
var resData = "";
var blankForm;

function populateForm(blankForm) {
  return `<div class="fullNameInfo">
          <div class="formLabel"><label for="fullName">Full Name</label></div>
          <div class="fullNameInput"><input type="text" id="fullName" name="user_name"></div>
          </div>

          <div class="numGuestsInfo">
          <div class="formLabel"><label for="numGuests">Number of Guests</label></div>
          <div class="guestInput"><input type="text" id="numGuests" name="num_Guests" /></div>
          </div>

          <div class="dateResInfo">
          <div class="formLabel"><label for="dateRes">Date</label></div>
          <div class="dateInput"><input type="date" value="" placeholder="" id="dateRes" name="date_res" /></div>
          </div>

          <div class="messageInfo">
          <div class="formLabel"><label for="msg">Message</label></div>
          <div class="messageInput"><textarea id="msg" name="user_message"></textarea></div>
          </div>

          <div class="seatPrefInfo">
          <div class="formLabel"><label for="seatPref">Seating Preference</label></div>
          <div class="seatInput"><select id="seatPref" name="seat_pref" />
            <option value = "indoor">Indoor</option>
            <option value = "outdoor">Outdoor</option>
          </select></div>
          </div>`
}

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

export {resData, confirmScreen, populateForm, blankForm};
