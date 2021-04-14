const GUMROAD_DOMAIN_PATTERNS = ["gum.co", "gumroad.com"];

const prepareGumroadWidget = () => {
  if (document.getElementById("gumroad-widget")) {
    return;
  }

  // Create a hidden iframe which will be used to host the Gumroad embed in the right sidebar
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

const addGumroadLinkHandlers = () => {
  const gumroadLinks = Array.from(document.getElementsByTagName("a")).filter(
    (link) => {
      return (
        link.dataset.gumroadEmbed !== "false" &&
        GUMROAD_DOMAIN_PATTERNS.includes(link.hostname)
      );
    }
  );

  gumroadLinks.forEach((link) => {
    // When a Gumroad link is clicked, embed it in the iframe
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const gumroadLink = event.target.getAttribute("href");

      const widget = document.getElementById("gumroad-widget");
      widget.style.display = "block";
      widget.src = gumroadLink;
    });
  });
};

const initializeGumroadWidget = () => {
  prepareGumroadWidget();
  addGumroadLinkHandlers();
};

// Make this work for both sync and async scripts
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeGumroadWidget();
  });
} else {
  initializeGumroadWidget();
}
