export function scrollToTop(autoFocusCursor: any): any {
  const inputElement = autoFocusCursor.value.$el;
  const inputRect = inputElement.getBoundingClientRect();

  // Check if the input is already in the viewport
  if (inputRect.top >= 0 && inputRect.bottom <= window.innerHeight) {
    inputElement.querySelector("input")?.focus();
  } else {
    // If not, scroll to the input element
    window.scrollTo({
      top: window.scrollY + inputRect.top - window.innerHeight / 2,
      behavior: "smooth",
    });

    // Focus on the input after scrolling completes
    setTimeout(() => {
      inputElement.querySelector("input")?.focus();
    }, 500); // Adjust the timeout based on your scroll duration
  }
}
