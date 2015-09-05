# dumb-react

[Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

## Quick Start

```
const dumb = require('dumb-react')

const Hello = dumb(function Hello(props) {
    return (
        <div>Hello {props.name}</div>
    )
})

// optional step:
Hello.propTypes = { name: React.PropTypes.string.isRequried }
```

## Why would I use this?

When writing React components you often have sections of the UI that you display
conditionally, or you generate from a list of data. There are a few options on
how to accomplish these. Here's a sample where I chose to create variables in my
`render()`

```
export default class Sample extends React.Component {
    render() {
        const { items, total } = this.props

        const itemElements = items.map((item) => {
            return (
                <li key={item.id}>
                    {item.name}
                </li>
            )
        })

        let moreButton
        if (items.length < total) {
            moreButton = (
                <button onClick={this.onLoadMore.bind(this)}>Load more</button>
            )
        }

        return (
            <div>
                Results:
                <ul>
                    {itemElements}
                </ul>
                {moreButton}
            </div>
        )
    }
}
```

Personally, I don't really like how `render` just keeps growing and is doing a
bunch of different things. I have been splitting these into different render
methods in the same component. I have a choice here. I could pass `items` and
`total` to the functions that need them, or I could just call the functions with
no parameters and let them handle pulling what they need off of `this.props`.

```
export default class Sample extends React.Component {
    renderItemElements(items) {
        return items.map((item) => {
            return (
                <li key={item.id}>
                    {item.name}
                </li>
            )
        })
    }
    renderMoreButton(items, total) {
        if (items.length < total) {
            return (
                <button onClick={this.onLoadMore.bind(this)}>Load more</button>
            )
        }
    }
    render() {
        const { items, total } = this.props
        return (
            <div>
                Results:
                <ul>
                    {this.renderItemElements(items)}
                </ul>
                {this.renderMoreButton(items, total)}
            </div>
        )
    }
}
```

Those render methods don't really do much. Why not make them their own
components? This is what `dumb-react` is for

```
const ItemElements = dumb(function ItemElements(props) {
    return props.items.map((item) => {
        return (
            <li key={item.id}>
                {item.name}
            </li>
        )
    })
})

const MoreButton = dumb(function MoreButton(props) {
    if (props.items.length < props.total) {
        return (
            <button onClick={props.onLoadMore}>Load more</button>
        )
    }
})

export default class Sample extends React.Component {
    render() {
        const { items, total } = this.props
        return (
            <div>
                Results:
                <ul>
                    <ItemElements items={items} />
                </ul>
                <MoreButton
                    items={items}
                    total={total}
                    onLoadMore={this.onLoadMore.bind(this)} />
            </div>
        )
    }
}
```
