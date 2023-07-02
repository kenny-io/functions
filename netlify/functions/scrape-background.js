import axios  from 'axios'
import cheerio  from 'cheerio'

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract relevant data from the HTML using Cheerio selectors

    console.log(`Website ${url} scraped successfully`);
  } catch (error) {
    console.error(`Error scraping website ${url}: ${error}`);
  }
}

exports.handler = async function () {
  const websites = [
    "https://dev-portal.collab.land",
    "https://docs.collab.land"
  ];

  const promises = websites.map(website => scrapeWebsite(website));

  try {
    await Promise.all(promises);
    console.log("All websites scraped successfully");
    return {
      statusCode: 200,
      body: "Websites scraped successfully"
    };
  } catch (error) {
    console.error("Error scraping websites:", error);
    return {
      statusCode: 500,
      body: "Error scraping websites"
    };
  }
};
