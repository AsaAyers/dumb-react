import React from 'react'

export default class Sample extends React.Component {
    static displayName = 'Sample'

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

const dumb = require('dumb-react')

const Hello = dumb(function Hello(props) {
    return (
        <div>Hello {props.name}</div>
    )
})

Hello.propTypes = { name: React.PropTypes.string.isRequried }

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
