import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen min-h-fit pb-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl my-5">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <p className="sm:text-2xl font-semibold text-xl px-2 mb-4">Sorry, we can&apos;t find that page.</p>
      <p className="sm:text-xl font-semibold px-2 mb-8">But don&apos;t worry,<br /> you can find plenty of other things on our homepage.</p>
      <Link
        to="/"
        className="btn btn-outline btn-lg border-base-100  hover:bg-base-100 hover:text-neutral"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
