export class CreateUserDto {
  first_name: string;

  last_name: string;

  auth_provider: string;

  phone_number?: string;

  email: string;

  user_photo: string;
}
