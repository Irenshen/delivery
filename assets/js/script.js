document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".orders-content-wrap")) {
    const profileBlock = document.querySelector(".orders-content-wrap");
    const radioButtons = document.querySelectorAll('input[name="subject"]');

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        profileBlock.classList.remove(
          "profile-block--individual",
          "profile-block--legal"
        );

        if (this.value === "individual") {
          profileBlock.classList.add("profile-block--individual");
        } else {
          profileBlock.classList.add("profile-block--legal");
        }
      });
    });
  }

});

$(document).ready(function () {
  $('input[type="tel"]').mask("+375 (99) 999-99-99");

  //табы юр и физ лица
  $(".profile-block__tab").click(function () {
    var $parentBlock = $(this).closest(".profile-block-wrap");

    $(this).addClass("active").siblings().removeClass("active");

    if ($(this).text().trim() === "Физическое лицо") {
      $parentBlock
        .removeClass("profile-block--legal")
        .addClass("profile-block--individual");
    } else if ($(this).text().trim() === "Юридическое лицо") {
      $parentBlock
        .removeClass("profile-block--individual")
        .addClass("profile-block--legal");
    }

    $parentBlock
      .find(".profile-block__tabs-content-wrap")
      .find(".profile-block__tab-content")
      .removeClass("opened")
      .eq($(this).index())
      .addClass("opened");
  });

  $(".select").each(function () {
    const _this = $(this),
      selectOption = _this.find("option"),
      selectOptionLength = selectOption.length,
      duration = 200;

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $("<div>", {
      class: "new-select",
      text: _this.children("option:disabled").text(),
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    $("<div>", {
      class: "new-select__list",
    }).insertAfter(selectHead);

    const selectList = selectHead.next(".new-select__list");
    for (let i = 1; i < selectOptionLength; i++) {
      $("<div>", {
        class: "new-select__item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
        .attr("data-value", selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find(".new-select__item");
    selectList.slideUp(0);
    selectHead.on("click", function () {
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        selectList.slideDown(duration);

        selectItem.on("click", function () {
          let chooseItem = $(this).data("value");

          $("select").val(chooseItem).attr("selected", "selected");
          selectHead.text($(this).find("span").text());

          selectList.slideUp(duration);
          selectHead.removeClass("on").addClass("new-select_checked");
        });
      } else {
        $(this).removeClass("on");
        selectList.slideUp(duration);
      }
    });
    // close dropdown (click outside)
    $(document).on("click", function (e) {
      if ($(e.target).closest(".select").length === 0) {
        selectList.hide();
        selectHead.removeClass("on");
      }
    });
  });
});
