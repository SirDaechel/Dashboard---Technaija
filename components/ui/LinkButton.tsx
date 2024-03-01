import Link from "next/link";

type LinkButtonProp = {
  link: string;
  classname: string;
  text: string;
};

const LinkButton = ({ link, classname, text }: LinkButtonProp) => {
  return (
    <Link href={link} className={classname}>
      {text}
    </Link>
  );
};

export default LinkButton;
