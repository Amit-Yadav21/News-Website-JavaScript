document.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const newsContainer = document.getElementById('newsContainer');

    async function fetchNews(query) {
        const apiKey = '0d4d93237b364b27aed4c48768350fdd';
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';
        articles.forEach(article => {
            if (article.title && article.description && article.urlToImage) { // Ensure title, description, and image exist
                const newsArticle = document.createElement('div');
                newsArticle.classList.add('newsArticle');
                
                const articleImage = document.createElement('img');
                articleImage.src = article.urlToImage; // Use image from the article
                newsArticle.appendChild(articleImage);
                
                const articleTitle = document.createElement('h2');
                articleTitle.textContent = article.title;
                newsArticle.appendChild(articleTitle);
                
                const articleDescription = document.createElement('p');
                articleDescription.textContent = article.description;
                newsArticle.appendChild(articleDescription);
                
                const readMoreLink = document.createElement('a');
                readMoreLink.href = article.url;
                readMoreLink.textContent = 'Read More...';
                readMoreLink.target = '_blank'; // Open link in a new tab
                newsArticle.appendChild(readMoreLink);
                
                newsContainer.appendChild(newsArticle);
            }
        });
    }

    function searchNews() {
        const query = searchInput.value;
        fetchNews(query);
    }

    // Fetch and display news by default
    fetchNews('latest');

    searchButton.addEventListener('click', searchNews);
});
