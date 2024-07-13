export class UserDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscribed: string[];
  channels: string[];

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    subscribed: string[],
    channels?: string[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.subscribed = subscribed;
    this.channels = channels || [];
  }
}
