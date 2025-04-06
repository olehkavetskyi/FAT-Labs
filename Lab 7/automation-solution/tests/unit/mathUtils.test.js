const { add, subtract, multiply, divide, isEven } = require('../../core/utils/mathUtils');

describe('Math Utility Functions', () => {
  test('adds two numbers', () => {
    expect(add(3, 7)).toBe(10);
  });

  test('subtracts two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplies two numbers', () => {
    expect(multiply(5, 6)).toBe(30);
  });

  test('divides two numbers', () => {
    expect(divide(20, 4)).toBe(5);
  });

  test('throws when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });

  test('checks if number is even', () => {
    expect(isEven(8)).toBe(true);
    expect(isEven(7)).toBe(false);
  });
});
