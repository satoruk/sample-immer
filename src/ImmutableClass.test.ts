import produce, { immerable } from "immer";

class UserTypeA {
  [immerable] = true;
  public name: string;
  public readonly age: number;

  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// class UserTypeB {
//   public name: string;
//   public readonly age: number;
//
//   public constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
// // rror TS7053: Element implicitly has an 'any' type because expression of
// //      type 'unique symbol' can't be used to index type 'typeof UserTypeB'.
// UserTypeB[immerable] = true;

// class UserTypeC {
//   public name: string;
//   public readonly age: number;
//
//   public constructor(name: string, age: number) {
//     // error TS7053:
//     //  Element implicitly has an 'any' type because expression of
//     //  type 'unique symbol' can't be used to index type 'UserTypeB'.
//     this[immerable] = true;
//     this.name = name;
//     this.age = age;
//   }
// }

test("immutable class(Type A)", () => {
  const user = new UserTypeA("Alice", 1);

  // this property is not readonly
  user.name = "Alice White";
  expect(user.name).toBe("Alice White");

  // Type error(read-only)
  // user.age = 2;

  // const nextUser = user;
  const nextUser = produce(user, draft => {
    draft.name = "Alice Black";
    draft.age = 3;
  });

  // Type error(read-only)
  // nextUser.age = 4;

  expect(() => {
    nextUser.name = "Alice Red";
  }).toThrowErrorMatchingInlineSnapshot(
    `"Cannot assign to read only property 'name' of object '#<UserTypeA>'"`
  );

  expect(nextUser.name).toBe("Alice Black");
});
