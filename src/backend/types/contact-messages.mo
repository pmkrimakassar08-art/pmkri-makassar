module {
  public type ContactMessageId = Nat;

  public type ContactMessage = {
    id : ContactMessageId;
    name : Text;
    email : Text;
    message : Text;
    createdAt : Int;
  };

  public type ContactMessageInput = {
    name : Text;
    email : Text;
    message : Text;
  };

  public type ContactMessageError = {
    #invalidName;
    #invalidEmail;
    #invalidMessage;
    #emailDeliveryFailed : Text;
  };
};
