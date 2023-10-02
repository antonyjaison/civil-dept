function verifyPhoneNumber(phoneNumber) {
    // Remove any non-numeric characters from the input
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Check if the numeric phone number has 10 digits (assuming it's a U.S. phone number)
    return numericPhoneNumber.length === 10;
  }

  
  export default verifyPhoneNumber