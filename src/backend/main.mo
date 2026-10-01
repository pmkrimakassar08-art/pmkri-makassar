import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import ContactMessagesApi "mixins/contact-messages-api";
import ApiDocMixin "mixins/api-doc";
import Types "types/contact-messages";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let contactMessages : Map.Map<Types.ContactMessageId, Types.ContactMessage>;
  let contactMessageState : { var nextMessageId : Nat };

  include MixinAuthorization(accessControlState, null);
  include ContactMessagesApi(accessControlState, contactMessages, contactMessageState);
  include ApiDocMixin();

  include Expose({
    entities = [
      contactMessages.toEntity("contactMessage", "ContactMessage", "id")
        .sample({ id = 0; name = ""; email = ""; message = ""; createdAt = 0 })
        .controllerOnly()
        .build(),
    ];
  });
};
