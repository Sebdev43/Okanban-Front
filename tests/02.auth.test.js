import { validateEmail, validatePassword } from '../assets/js/auth.js';

describe('Validation des Emails', () => {
  test('Emails valides', () => {
    const validEmails = [
      'test@example.com',
      'user.name+tag+sorting@example.com',
      'x@example.com',
      'example-indeed@strange-example.com'
    ];

    validEmails.forEach(email => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  test('Emails invalides', () => {
    const invalidEmails = [
      'plainaddress', // pas de @
      '@missingusername.com', // pas de nom d'utilisateur
      'username@.com', // pas de domaine valide
      'username@.com.', // point final supplémentaire
      'username@-example.com', // tiret en début de domaine
      'username@example..com', // double point
      'username@.com.com' // point après @
    ];

    invalidEmails.forEach(email => {
      console.log(`Testing invalid email: ${email}`);
      expect(validateEmail(email)).toBe(false);
    });
  });
});

describe('Validation des Mots de Passe', () => {
  test('Mots de passe valides', () => {
    const validPasswords = [
      'Password1!',
      'Complex@123',
      'StrongPass@1',
      'MyS3cur3P@ss'
    ];

    validPasswords.forEach(password => {
      expect(validatePassword(password)).toBe(true);
    });
  });

  test('Mots de passe invalides', () => {
    const invalidPasswords = [
      'short1!', // trop court
      'noSpecialChar1', // pas de caractère spécial
      'NoNumber!', // pas de chiffre
      'NOLOWERCASE1!', // pas de minuscule
      'nouppercase1!', // pas de majuscule
      'NoDigit!', // pas de chiffre
      'Short1!' // trop court
    ];

    invalidPasswords.forEach(password => {
      expect(validatePassword(password)).toBe(false);
    });
  });
});
