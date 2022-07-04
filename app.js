const $linkScroll = $(".scrollFix");
const $links = $(".linkContainer");
$;
console.log($links);

function sendMail() {
  var name = $("#contact #name").val();
  var email = $("#contact #email").val();
  var message = $("#contact textarea").val();
  window.location.href =
    "mailto:mail@company.com?subject=The subject - " +
    name +
    " (" +
    email +
    ")" +
    "&body=" +
    message;
}

$(document).ready(() => {
  $(window).bind("scroll", () => {
    let navHeight = $(window).height() - 70;
    if ($(window).scrollTop() > navHeight) {
      $links.addClass("scrollFix");
      console.log("scrollup");
    } else {
      $links.removeClass("scrollFix");
      console.log("scrolldown");
    }
  });
});
