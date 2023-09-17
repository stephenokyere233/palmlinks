export const FIREBASE_AUTH_ERRORS = {
  popupClosed: "Firebase: Error (auth/popup-closed-by-user).",
  userNotFound: "Firebase: Error (auth/user-not-found).",
  emailInUse: "Firebase: Error (auth/email-already-in-use).",
  invalidEmail: "Firebase: Error (auth/invalid-email).",
  weakPassword:
    "Firebase: Password should be at least 6 characters (auth/weak-password).",
  wrongPassword: "Firebase: Error (auth/wrong-password).",
  connectionError: "Firebase: Error (auth/network-request-failed).",
  serverError: "Firebase: Error (auth/internal-error).",
};

export const ERROR_MESSAGES = {
  AUTH: {
    popupClosed: "Authentication cancelled",
    invalidEmail: "Email is invalid",
    userNotFound: "Couldn't find user with this email",
    weakPassword: "Password should be at least 6 characters",
    emailInUse: "Email already in use",
    wrongPassword: "Wrong Password! Try Again",
    connectionError: "Suddenly, there's a network problem. Please try again!",
    serverError: "You might be having connection issues",
  },
};
