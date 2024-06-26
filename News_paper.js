async function getTopHeadlines() {
    const response = await fetch('/GetAllNews.json');
    try {
        if (!response.ok) {
            console.error("No data available");
        }
        const data = await response.json();
        displayArticles(data.articles);
        
    } catch (error) {
        console.error(error.message);
        alert("Failed to search top headlines. Please try again.");
    }
}

getTopHeadlines();


function displayArticles(articles) {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";
    if (articles.length === 0) {
        newsContainer.innerHTML = "<h1>No articles found.</h1>";
        return;
    }
    articles.map((article) => {
        newsContainer.innerHTML += `
        <div class="newsArticle">
            <img src="${article.urlToImage}" onerror="this.src='Error-Img.png';" />
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <h3> Read full article <a target = "_blank" href = "${article.url}">&#8594;</a></h3>
        </div>`;
    });
}

async function searchNews() {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput === "") {
        alert("Please enter something for search.");
        return;
    }
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchInput}&apiKey=0d4d93237b364b27aed4c48768350fdd`);
    try {
        if (!response.ok) {
            console.error("No data available");
        }
        const data = await response.json();
        displayArticles(data.articles);
        if (data.articles.length === 0) {
            alert("No articles found for the given search.");
        }
    } catch (error) {
        console.error(error.message);
        alert("Failed to fetch search results. Please try again later.");
    }
}

