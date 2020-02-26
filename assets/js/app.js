function navbarBurger() {
  const burger = $(".navbar-burger"),
    menu = $(".navbar-menu");

  burger.click(function() {
    [burger, menu].forEach((el) => el.toggleClass('is-active'));
  });
}

function imgModals() {
  $(".img").click(function() {
    const id = $(this).attr('id');
    const modalId = `#modal-${id}`;

    $(modalId).addClass('is-active');

    $(`${modalId} .modal-close`).click(function() {
      $(modalId).removeClass('is-active');
    });
  });
}

$(() => {
  console.log("Welcome to the Harbor docs");

  navbarBurger();
  imgModals();
});
