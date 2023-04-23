//ourdomain.com/news/something-important :id
//If you're going to use nested paths or :ids in the url, you have to use the folder + index.js structure.
//Using a HREF link would send a case to

import Link from 'next/link';

function NewsPage() {
  return (
    <>
      <h1>The News Page</h1>;
      <ul>
        <li>
          <Link href='/news/nextjs-is-a-great-framework'>
            NextJS Is a Great Framework
          </Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}

export default NewsPage;
