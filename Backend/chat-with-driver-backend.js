function sendToDriver(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") ||msg.includes("Hello")|| msg.includes("hi")) {
    return "Hello";
  }

  if (msg.includes("where are you now? ")||msg.includes("Where are you now? ")) {
    return "I'm on my way to your pickup point 🚗.";
  }
if (msg.includes("How long unitl you arrive? ")||msg.includes("how long unitl you arrive?")) {
    return "i'll arrive in about 2 minutes.";
  }
  if (msg.includes("thank")) {
    return "You're welcome!";
  }

  return "I'm currently driving, will respond shortly.";
}