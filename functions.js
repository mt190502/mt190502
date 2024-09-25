let gkey_press_count = 0;
let hkey_press_count = 0;

function keyClick(key) {
  document.dispatchEvent(new KeyboardEvent("keydown", {
    key: key,
    bubbles: true,
    cancelable: true,
  }))
}

function handleScroll() {
  const main = document.querySelector("main");
  const main_container = document.querySelector(".container.main");
  const line_counter = document.getElementById("line-counter");
  let scroll_percent = Math.ceil(
    ((main_y_pos) => {
      const total_height = main.scrollHeight - main.clientHeight;
      if (total_height <= 0) return 100;
      return (main_y_pos / total_height) * 100;
    })(main?.scrollTop)
  );

  if (scroll_percent >= 100) {
    line_counter.innerHTML =
      'Manual page mtahadev(1) line 100% (END) (press <a href="javascript:void(0)" onclick="keyClick(`h`)">h</a> for help' +
      (window.getComputedStyle(main_container).display === "none"
        ? ' or <a href="javascript:void(0)" onclick="keyClick(`q`)">q</a> to quit)'
        : ")");
    line_counter.style.filter = "invert(0%)";
  } else {
    if (isNaN(scroll_percent)) scroll_percent = 0;
    line_counter.innerHTML =
      "Manual page mtahadev(1) line " +
      scroll_percent +
      '% (press <a href="javascript:void(0)" onclick="keyClick(`h`)">h</a>' +
      " for help" +
      (window.getComputedStyle(main_container).display === "none"
        ? ' or <a href="javascript:void(0)" onclick="keyClick(`q`)">q</a> to quit)'
        : ")");
    line_counter.style.filter = "invert(0%)";
  }
}

document.querySelector("main")?.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", handleScroll);
document.addEventListener("keydown", function (event) {
  const main_container = document.querySelector(".container.main");
  const help_container = document.querySelector(".container.help");
  const main_section = document.querySelector("main");

  switch (event.key) {
    case "h":
      if (window.getComputedStyle(main_container).display !== "none") {
        main_container.style.display = "none";
        help_container.style.display = "block";
      }
      hkey_press_count++;
      if (hkey_press_count === 6)
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      break;
    case "q":
    case "Escape":
      if (window.getComputedStyle(help_container).display !== "none") {
        hkey_press_count = 0;
        main_container.style.display = "block";
        help_container.style.display = "none";
      }
      break;
    case "G":
      main_section?.scrollTo({
        top: main_section.scrollHeight,
        behavior: "smooth",
      });
      break;
    case "g":
      gkey_press_count++;

      if (gkey_press_count === 2) {
        main_section?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        gkey_press_count = 0;
      }
      setTimeout(() => {
        gkey_press_count = 0;
      }, 1000);
      break;
    case "j":
      main_section?.scrollBy({
        top: 100,
      });
      break;
    case "k":
      main_section?.scrollBy({
        top: -100,
      });
      break;
  }
  handleScroll();
});
