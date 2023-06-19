import "./heading.css";

type HeadingProps = {
	type: string;
	title: string;
};
const Heading = ({ type, title }: HeadingProps) => {
	return <p className={`heading-${type}`}>{title}</p>;
};

export default Heading;
