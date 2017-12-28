export class User {
  id: number;
  type: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  heading: string;
  summary: string;
  image: string;
  email: string;
  social: string;

  constructor (obj) {
    this.id = obj['id'];
    this.type = obj['type'];
    this.name = obj['name'];
    this.first_name = obj['first_name'];
    this.last_name = obj['last_name'];
    this.username = obj['username'];
    this.image = obj['image'];
    this.heading = obj['heading'];
    this.summary = obj['summary'];
    this.email = obj['email'];
    this.social = obj['social'];
  }
}
