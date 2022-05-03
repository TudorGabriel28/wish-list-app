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

/* const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);
const got = require('got');

export default async function ogScraper(targetUrl: string, userAgent: string) {
  const { body: html, url } = await got(targetUrl, {
    headers: { 'User-Agent': userAgent }
  });
  console.log(html);
  const metadata = await metascraper({ html, url });
  console.log(metadata);
  return { metadata };
}
 */
