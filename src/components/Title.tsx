type Props = {
    text: string
    level: 1 | 2 | 3 | 4
};

export function Title(props: Props) {
    function getTitle() {
        switch (props.level) {
            case 1:
                return <h1 dangerouslySetInnerHTML={{__html: props.text}}/>;
            case 2:
                return <h2 dangerouslySetInnerHTML={{__html: props.text}}/>;
            case 3:
                return <h3 dangerouslySetInnerHTML={{__html: props.text}}/>;
            case 4:
                return <h4 dangerouslySetInnerHTML={{__html: props.text}}/>;
            default:
                return <h1 dangerouslySetInnerHTML={{__html: props.text}}/>;
        }
    }

    return (
        <>
            {getTitle()}
        </>
    );
}