//ourdomain.com/news/something-important :id
//If you're going to use nested paths or :ids in the url, you have to use the folder + index.js structure.
//This is a dynamic page -- a page that we'd use to display data pulled from a database.
//The [name].js formulation signals to NextJS that we're using a dynamic page. This page will be loaded no matter what URL is put in afer /news

import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();

  const newsId = router.query.newsId; //this is how we get the newsId from the URL. The name comes from the file name.
  //We could send a request to an API to get news items using the newsId.

  return <h1>The Detail Page</h1>;
}

export default DetailPage;
