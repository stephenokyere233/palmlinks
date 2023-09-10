export interface StoreState extends StoreAction {
  showSignUp: boolean;
}

export interface StoreAction {
  setShowSignUp: (showSignUp: StoreState["showSignUp"]) => void;
}
