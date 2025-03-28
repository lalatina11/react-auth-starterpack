interface Props {
  title: string;
  description?: string;
}
const PageHelmet = (props: Props) => {
  const { title, description } = props;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};

export default PageHelmet;
