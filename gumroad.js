const GUMROAD_DOMAIN_PATTERNS = ["gum.co", "gumroad.com"];

document.addEventListener("DOMContentLoaded", () => {
  prepareGumroadWidget();
  addGumroadButtonHandlers();
});

const prepareGumroadWidget = () => {
  if (document.getElementById("gumroad-widget")) {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", "gumroad-widget");
  iframe.style.display = "none";
  iframe.width = 400;
  iframe.height = 800;
  document.body.appendChild(iframe);
};

const addGumroadButtonHandlers = () => {
  const gumroadLinks = Array.from(
    document.getElementsByTagName("a")
  ).filter((link) => GUMROAD_DOMAIN_PATTERNS.includes(link.hostname));

  gumroadLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const gumroadLink = event.target.getAttribute("href");

      const widget = document.getElementById("gumroad-widget");
      widget.style.display = "block";
      widget.src = gumroadLink;
    });
  });
};
