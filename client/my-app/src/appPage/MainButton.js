export default (props) => {
    return (
            <div class={props.active ? "btnMain btnMain-active" : "btnMain"} onClick={props.onClick}>
                <img class="iconImg" src="exclamation.png"/>
            </div>

    )
}