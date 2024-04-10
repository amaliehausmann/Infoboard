document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23"
  )
    .then((response) => response.json())
    .then((data) => {
      const newsItems = data.items.slice(0, 4); // Only the first 4 news items
      const NewsSection = document.getElementById('news');

      // Clear previous content
      NewsSection.innerHTML = "";

      // Iterate through each news item and append to the section
      newsItems.forEach((item) => {
        const title = document.createElement("p");
        title.className = 'newsTitle';
        const pubDate = document.createElement("p");
        pubDate.className = 'pubDate';
        const newsBox = document.createElement('section');
        newsBox.className = 'newsBox';

        title.textContent = item.title;
        pubDate.textContent = new Date(item.pubDate).toLocaleString('da-DK', {
          hour: '2-digit',
          minute: '2-digit'
        });

        newsBox.appendChild(pubDate);
        newsBox.appendChild(title);
        NewsSection.appendChild(newsBox);
      });
    })
    .catch((error) => console.error("Error fetching news:", error));
});
