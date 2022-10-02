import { Helmet } from "react-helmet-async";

function PageTitle({ title, description }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Holidaze | {title}</title>
      <link rel="canonical" href="https://holidaze-pe2-mh.netlify.app/" />
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default PageTitle;
