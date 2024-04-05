document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23"
  )
    .then((response) => response.json())
    .then((data) => {
      const newsItems = data.items;
      const newsList = document.getElementById("news-list");

      // Clear previous content
      newsList.innerHTML = "";

      // Iterate through each news item and append to the list
      newsItems.forEach((item) => {
        const listItem = document.createElement("li");
        const title = document.createElement("h2");
        const link = document.createElement("a");
        const pubDate = document.createElement("p");

        title.textContent = item.title;
        link.textContent = "Read more";
        link.href = item.link;
        pubDate.textContent = new Date(item.pubDate).toLocaleString();

        listItem.appendChild(title);
        listItem.appendChild(link);
        listItem.appendChild(pubDate);

        newsList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching news:", error));
});
