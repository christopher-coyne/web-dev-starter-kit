export interface ClerkUser {
  sub: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}
