import produce from "immer";

type Iterm = Readonly<{
  todo: string;
  done: boolean;
}>;

type State = ReadonlyArray<Iterm>;

test("immutable array", () => {
  const baseState: State = [
    {
      todo: "Learn typescript",
      done: true
    },
    {
      todo: "Try immer",
      done: false
    }
  ];

  const nextState = produce(baseState, draft => {
    // draft is a mutable list
    draft.push({
      todo: "Tweet about it",
      done: false
    });
    draft[1] = {
      ...draft[1],
      done: true
    };
  });

  expect(baseState).toMatchInlineSnapshot(`
    Array [
      Object {
        "done": true,
        "todo": "Learn typescript",
      },
      Object {
        "done": false,
        "todo": "Try immer",
      },
    ]
  `);
  expect(nextState).toMatchInlineSnapshot(`
    Array [
      Object {
        "done": true,
        "todo": "Learn typescript",
      },
      Object {
        "done": true,
        "todo": "Try immer",
      },
      Object {
        "done": false,
        "todo": "Tweet about it",
      },
    ]
  `);
});
