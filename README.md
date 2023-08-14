# React Anti Patterns to Be Avoid

all about the common anti-patterns we should avoid when using React.

## Initializing the state using properties

How initializing the state using properties received from the parent is usually an anti-pattern.

**Counter Component**
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
