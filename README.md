# React Anti Patterns to Be Avoid

all about the common anti-patterns we should avoid when using React.

## Initializing the state using properties

How initializing the state using properties received from the parent is usually an anti-pattern.

**Counter Component:**

Let's set the state using props.

```typescript
const [state, setState] = useState<number>(props.count)
```

The implementation of the click handler is straightforward – just add 1 to the current count value and store the resulting value back in the state:

```typescript
const handleClick = () => {
  setState({ count: state.count + 1 })
}
```

There are two main errors, which are outlined as follows:

- We have a duplicated source of truth.
- If the count property passed to the component changes, the state does not get updated.

This makes it unclear which is the current and trustworthy value to use inside the component and to display to the user.

The second problem centers on how the class is created and instantiated by React. The **useState** function of the component gets called only once when the component is created.

In our Counter component, we read the value of the count property and we store it in the state. If the value of that property changes during the life cycle of the application (let’s say it becomes 10), the Counter component will never use the new value because it has already been initialized. This puts the component in an inconsistent state, which is not optimal and hard to debug.

What if we really want to use the prop’s value to initialize the component, and we know for sure that the value does not change in the future?

In that case, it’s best practice to make it explicit and give the property a name that makes your intentions clear, such as initialCount. For example, let’s say we change the prop declaration of the Counter component in the following way:

```typescript
type Props = {
   initialCount: number
}
const Counter: FC<Props> = (props) => {
   const [count, setState] = useState<Count>({ count: props.initialCount
   })
 ...
}
```

This usage makes it clear that the parent can only initialize the counter, and any subsequent values of the initialCount property will be disregarded:

```typescript
<Counter initialCount={1} />
```

## Using indexes as a key

The key property uniquely identifies an element in the DOM and React uses it to check whether the element is new or whether it must be updated when the component properties or state change.

Using keys is always a good idea and if you don’t do it, React gives a warning in the console (in development mode). However, it is not simply a matter of using a key; sometimes, the value that we decide to use as a key can make a difference. In fact, using the wrong key can give us unexpected behaviors in some instances. In this section, we will see one of those instances.

**List Component:**

```typescript
import { FC, useState } from 'react'
const List: FC = () => {
  const [items, setItems] = useState(['foo', 'bar'])
  const handleClick = () => {
    const newItems = items.slice()
    newItems.unshift('baz')
    setItems(newItems)
  }
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClick}>+</button>
    </div>
  )
}
export default List
```

If you run the component inside the browser, you will not see any problems; clicking the + button inserts a new item at the top of the list. But let’s do an experiment.

Let’s change the render in the following way, adding an input field near each item. We then use an input field because we can edit its content, making it easier to figure out the problem:

```typescript
return (
  <div>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item}
          <input type="text" />
        </li>
      ))}
    </ul>
    <button onClick={handleClick}>+</button>
  </div>
)
```

As shown in the following screenshot, the items shift down while the input elements remain in the same position in such a way that their value does not match the value of the items anymore:

![alt text]("using indexes as a key.png", "using indexes as a key")

Running the component, clicking +, and checking the console should give us all the answers we need.

What we can see is that instead of inserting the new element at the top, React swaps the text of the two existing elements, and inserts the last item at the bottom as if it was new. The reason it does that is that we are using the index of the map function as the key.

In fact, the index always starts from 0, even if we push a new item to the top of the list, so React thinks that we changed the values of the existing two and added a new element at index 2. The behavior is the same as it would have been without using the key property at all.

This is a very common pattern because we may think that providing any key is always the best solution, but it is not like that at all. The key must be unique and stable, identifying one, and only one, item.

To solve this problem, we can, for example, use the value of the item if we expect it not to be repeated within the list, or create a unique identifier, for example:

```typescript
{
  items.map((item, index) => (
    <li key={`${item}-${index}`}>
      {item}
      <input type="text" />
    </li>
  ))
}
```
