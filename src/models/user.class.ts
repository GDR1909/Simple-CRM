/**
 * Represents a User with personal details.
 */
export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;


  /**
   * Creates an instance of the User class.
   * 
   * @param {Object} [obj] - Optional object to initialize the User instance.
   * @param {string} [obj.id] - The unique identifier for the user.
   * @param {string} [obj.firstName] - The first name of the user.
   * @param {string} [obj.lastName] - The last name of the user.
   * @param {string} [obj.email] - The email address of the user.
   * @param {number} [obj.birthDate] - The birth date of the user, represented as a timestamp.
   * @param {string} [obj.street] - The street address of the user.
   * @param {number} [obj.zipCode] - The postal code of the user's address.
   * @param {string} [obj.city] - The city where the user resides.
   */
  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }


  /**
   * Converts the User instance to a JSON object.
   * 
   * @returns {Object} The JSON representation of the User instance.
   */
  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };
  }
}