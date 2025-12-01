import Title from "./Title";

export default function Header(props) {
    const val = props.count;
    return (
        <div>
            <Title val={val} />
        </div>
    );
}
