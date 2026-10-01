import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import ContactMessagesLib "../lib/contact-messages";
import Types "../types/contact-messages";

mixin (
  accessControlState : AccessControl.AccessControlState,
  messages : Map.Map<Types.ContactMessageId, Types.ContactMessage>,
  state : { var nextMessageId : Nat },
) {
  public shared func submitContactMessage(input : Types.ContactMessageInput) : async Types.ContactMessage {
    ignore accessControlState;
    await ContactMessagesLib.submitMessage(messages, state, input);
  };

  public query ({ caller }) func listContactMessages() : async [Types.ContactMessage] {
    ignore caller;
    ContactMessagesLib.listMessages(messages);
  };
};
