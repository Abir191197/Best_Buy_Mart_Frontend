export const createCartAnimation = (
  startElement: HTMLElement,
  endElement: HTMLElement,
  imageUrl: string
) => {
  const flyingImage = document.createElement("img");
  flyingImage.src = imageUrl;
  flyingImage.style.position = "fixed";
  flyingImage.style.zIndex = "9999";
  flyingImage.style.borderRadius = "8px";
  flyingImage.style.width = "50px"; // Reduced size for better visual experience
  flyingImage.style.height = "50px";
  flyingImage.style.objectFit = "cover";
  flyingImage.style.pointerEvents = "none";

  const startRect = startElement.getBoundingClientRect();
  const endRect = endElement.getBoundingClientRect();

  flyingImage.style.left = `${startRect.left}px`;
  flyingImage.style.top = `${startRect.top}px`;

  document.body.appendChild(flyingImage);

  flyingImage.animate(
    [
      {
        transform: "scale(1) rotate(0deg)",
        opacity: 1,
      },
      {
        transform: "scale(0.5) rotate(360deg)",
        opacity: 0.8,
        offset: 0.8,
      },
      {
        transform: "scale(0.25) rotate(720deg)",
        opacity: 0,
        left: `${endRect.left}px`,
        top: `${endRect.top}px`,
      },
    ],
    {
      duration: 800,
      easing: "ease-out", // Smooth easing for smoother animation
    }
  ).onfinish = () => {
    flyingImage.remove(); // Cleanup the flying image after animation
  };

  endElement.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.1)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 300,
      delay: 500, // Added delay for the effect
      easing: "ease-out",
    }
  );
};
