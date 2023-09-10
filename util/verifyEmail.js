function verifyEmail(email) {
    // Regular expression pattern for a basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Use the test method to check if the email matches the pattern
    return emailPattern.test(email);
  }

  
  export default verifyEmail