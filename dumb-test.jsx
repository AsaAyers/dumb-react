import test from 'tape-catch'
import dumb from './dumb.js'
import React from 'react/addons'
const TestUtils = React.addons.TestUtils

function createComponent(element) {
    const shallowRenderer = TestUtils.createRenderer()
    shallowRenderer.render(element)
    return shallowRenderer.getRenderOutput()
}

test('dumb: implicit displayName', (assert) => {
    const Component = dumb(function HelloWorld(props) {
        return (
            <div>Hello World</div>
        )
    })
    const actual = Component.displayName
    const expected = 'HelloWorld'

    assert.equal(actual, expected, "The component should get a display name from the function's name")
    assert.end()
})

test('dumb: implicit displayName', (assert) => {
    const Component = dumb(function render(props) {
        return (
            <div>Hello World</div>
        )
    }, 'HelloWorld')
    const actual = Component.displayName
    const expected = 'HelloWorld'

    assert.equal(actual, expected, "displayName can be set explicitly with the 2nd parameter")
    assert.end()
})

test('dumb: passes props to render', (assert) => {
    const expected = 'World'
    let actual

    const Hello = dumb(function Hello(props) {
        actual = props.name
        return null
    })

    createComponent(<Hello name="World" />)

    assert.equal(actual, expected, "props should be passed to your render method")
    assert.end()
})

// I have no idea how to test this. I did it manually with a real app
test('dumb: passes new props to render when they change')

test('dumb: render should have have access to this', (assert) => {
    let expected
    let actual

    const Hello = dumb(function Hello(props) {
        expected = props
        actual = this.props

        return null
    })

    createComponent(<Hello testProp={true}/>)

    assert.equal(actual, expected, "props should be passed to your render method")
    assert.end()

})
