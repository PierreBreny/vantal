// remove all .active classes when clicked anywhere
hide = true;
$("body").on("click", function() {
  if (hide) $(".search-element").removeClass("border-focus");
  hide = true;
});

// add and remove .active
$("body").on("click", ".search-element", function() {
  var self = $(this);
  if (self.hasClass("active")) {
    $(".search-element").removeClass("border-focus");
    return false;
  }

  $(".search-element").removeClass("border-focus");

  self.toggleClass("border-focus");
  hide = false;
});
