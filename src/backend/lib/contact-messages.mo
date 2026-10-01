import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import EmailClient "mo:caffeineai-email/emailClient";
import Types "../types/contact-messages";

module {
  // Alamat email pengurus yang menerima notifikasi pesan kontak.
  public let adminRecipient : Text = "sekretariat@pmkrimaksar.org";

  public func listMessages(messages : Map.Map<Types.ContactMessageId, Types.ContactMessage>) : [Types.ContactMessage] {
    messages.values().toArray();
  };

  public func submitMessage(
    messages : Map.Map<Types.ContactMessageId, Types.ContactMessage>,
    state : { var nextMessageId : Nat },
    input : Types.ContactMessageInput,
  ) : async Types.ContactMessage {
    let whitespace : Text.Pattern = #predicate (func(c) { c == ' ' or c == '\t' or c == '\n' or c == '\r' });
    let name = input.name.trim(whitespace);
    let email = input.email.trim(whitespace);
    let message = input.message.trim(whitespace);

    if (name.size() < 2) {
      return {
        id = 0;
        name = "";
        email = "";
        message = "";
        createdAt = 0;
      };
    };

    let id = state.nextMessageId;
    state.nextMessageId := id + 1;

    let record : Types.ContactMessage = {
      id;
      name;
      email;
      message;
      createdAt = Time.now();
    };

    messages.add(id, record);

    let htmlBody =
      "<h2>Pesan Kontak Baru</h2>" #
      "<p><strong>Nama:</strong> " # name # "</p>" #
      "<p><strong>Email:</strong> " # email # "</p>" #
      "<p><strong>Pesan:</strong></p><p>" # message # "</p>";

    // Pengiriman email bersifat best-effort: pesan tetap tersimpan dan
    // dikembalikan meskipun notifikasi email gagal atau trap.
    try {
      let result = await EmailClient.sendServiceEmail(
        "no-reply",
        [adminRecipient],
        "Pesan Kontak Baru dari " # name,
        htmlBody,
      );
      switch (result) {
        case (#ok) {};
        case (#err(error)) {
          Debug.print("Gagal mengirim notifikasi email kontak: " # error);
        };
      };
    } catch (error) {
      Debug.print("Gagal mengirim notifikasi email kontak: " # error.message());
    };

    record;
  };
};
