const $linkScroll = $(".scrollFix");
const $links = $(".linkContainer");

function sendMail() {
  const $name = $("#name").val();
  const $address = $("#address").val();
  const $email = $("#email").val();
  const $number = $("#number").val();
  const $message = $("#message").val();
  window.location.href =
    "mailto:jones.kyle2893@gmail.com?subject=Quote Request - " +
    $name +
    " (" +
    $email +
    ")" +
    "&body=" +
    $message;
}

$(document).ready(() => {
  $(window).bind("scroll", () => {
    let navHeight = $(window).height() - 30;
    if ($(window).scrollTop() > navHeight) {
      $links.addClass("scrollFix");
      console.log("scrollup");
    } else {
      $links.removeClass("scrollFix");
      console.log("scrolldown");
    }
  });
});
