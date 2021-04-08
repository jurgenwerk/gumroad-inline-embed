const GUMROAD_DOMAIN_PATTERNS = ["gum.co", "gumroad.com"];

document.addEventListener("DOMContentLoaded", () => {
  prepareGumroadWidget();
  addGumroadButtonHandlers();
});

const prepareGumroadWidget = () => {
  if (document.getElementById("gumroad-widget")) {
    return;
  }

  // Create a hidden iframe which will be used to host the Gumroad embed
  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", "gumroad-widget");
  iframe.style.top = 0;
  iframe.style.right = 0;
  iframe.style.position = "fixed";
  iframe.style.display = "none";
  iframe.width = 400;
  iframe.height = 800;
  document.body.appendChild(iframe);
};

const addGumroadButtonHandlers = () => {
  const gumroadLinks = Array.from(document.getElementsByTagName("a")).filter(
    (link) => {
      return (
        link.dataset.gumroadEmbed !== "false" &&
        GUMROAD_DOMAIN_PATTERNS.includes(link.hostname)
      );
    }
  );

  gumroadLinks.forEach((link) => {
    // When a Gumroad link is clicked, embed it in the iFrame
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const gumroadLink = event.target.getAttribute("href");

      const widget = document.getElementById("gumroad-widget");
      widget.style.display = "block";
      widget.src = gumroadLink;
    });
  });
};
