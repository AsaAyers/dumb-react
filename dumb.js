
export default function dumb(render, displayName = render.name) {
    const Component = function(props) {
        return {
            props,
            render() {
                return render.call(this, this.props)
            }
        }
    }

    Component.displayName = displayName

    return Component
}
