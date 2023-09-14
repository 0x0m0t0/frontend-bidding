export const endsWithImageExtension = (str) => {
  // Define an array of valid image extensions
  const validExtensions = [".png", ".jpeg", ".jpg", ".avif", ".webp"];

  // Create a regular expression pattern to match valid extensions
  const validExtensionPattern = new RegExp(
    `(${validExtensions.join("|")})$`,
    "i"
  );

  // Use test() method to check if the string ends with a valid extension
  return validExtensionPattern.test(str);
};

// // Example usage within an if statement:
// const fileName = "image.png";

// if (endsWithImageExtension(fileName)) {
//   console.log("Valid image extension");
// } else {
//   console.log("Not a valid image extension");
// }
