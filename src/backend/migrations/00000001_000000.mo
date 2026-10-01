import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type ContactMessageId = Nat;

  type ContactMessage = {
    id : ContactMessageId;
    name : Text;
    email : Text;
    message : Text;
    createdAt : Int;
  };

  type OldActor = {};

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    contactMessages : Map.Map<ContactMessageId, ContactMessage>;
    contactMessageState : { var nextMessageId : Nat };
  };

  public func migration(_ : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      contactMessages = Map.empty();
      contactMessageState = { var nextMessageId = 0 };
    };
  };
};
