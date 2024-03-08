type LoaderProp = {
  className: string;
};

const Loader = ({ className }: LoaderProp) => {
  return <span className={className}></span>;
};

export default Loader;
