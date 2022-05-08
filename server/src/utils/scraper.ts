const ogs = require('open-graph-scraper');

export default async function ogScraper(url: string, userAgent: string) {
  const { result, error } = await ogs({
    url,
    timeout: 15000,
    headers: { 'user-agent': userAgent }
  });

  if (error) {
    throw new Error('Product url is not valid.');
  }

  const { ogTitle, ogDescription, ogImage, ogUrl } = result;

  if ((ogTitle || ogDescription || ogImage || ogUrl) == null) {
    throw new Error('The url does not contain Open Graph Metadata');
  }

  return {
    name: ogTitle,
    picture: ogImage.url,
    description: ogDescription,
    url: ogUrl
  };
}
