---
id: query-functions
title: Query Functions
---

A query function can be literally any function that **returns a promise/observable**. The promise/observable that is returned should either **resolve the data** or **throw an error**.

All of the following are valid query function configurations:

```js
this.azahi.useQuery(['todos', todoId], fetchTodoById);
this.azahi.useQuery(['todos', todoId], () => fetchTodoById(todoId));
this.azahi.useQuery(['todos', todoId], async () => {
  const data = await fetchTodoById(todoId);
  return data;
});
```

## Handling and Throwing Errors

For Azahi to determine a query has errored, the query function **must throw**. Any error that is thrown in the query function will be persisted on the `error` state of the query.

```js
const queryResult = this.azahi.useQuery(['todos', todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error('Oh no!')
  }

  return data
})

....

$queryResult.error
```

## Usage with `fetch` and others clients that do not throw by default

While most utilities like `axios` or `graphql-request` automatically throw errors for unsuccessful HTTP calls, some utilities like `fetch` do not throw errors by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular `fetch` API:

```js
this.azahi.useQuery(['todos', todoId], async () => {
  const { ok, json } = await fetch('/todos/' + todoId);
  if (!ok) {
    throw new Error('Network response was not ok');
  }
  return json();
});
```

## Query Function Variables

Query keys are not just for uniquely identifying the data you are fetching, but are also conveniently passed into your query function and while not always necessary, this makes it possible to extract your query functions if needed:

```js
const queryResult = this.azahi.useQuery(
  ['todos', { status, page }],
  fetchTodoList
);

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey;
  return new Promise();
  // ...
}
```

## Using a Query Object instead of parameters

Anywhere the `[queryKey, queryFn, config]` signature is supported throughout Azahi's API, you can also use an object to express the same configuration:

```js
this.azahi.useQuery({
  queryKey: ['todo', 7],
  queryFn: fetchTodo,
  ...config,
});
```
