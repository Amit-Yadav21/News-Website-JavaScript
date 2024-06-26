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
        const validArticles = articles.filter(article => article.title && article.description && article.urlToImage);

        if (validArticles.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.classList.add('noResultsMessage');
            noResultsMessage.innerHTML = `<p>No news found 😞</p>`;
            newsContainer.appendChild(noResultsMessage);
        } else {
            validArticles.forEach(article => {
                const newsArticle = document.createElement('div');
                newsArticle.classList.add('newsArticle');
                
                const articleImage = document.createElement('img');
                articleImage.src = article.urlToImage;
                newsArticle.appendChild(articleImage);
                
                const articleTitle = document.createElement('h2');
                articleTitle.textContent = article.title;
                newsArticle.appendChild(articleTitle);
                
                const articleDescription = document.createElement('p');
                articleDescription.textContent = article.description;
                newsArticle.appendChild(articleDescription);
                
                const readMoreLink = document.createElement('a');
                readMoreLink.href = article.url;
                readMoreLink.textContent = 'Read More';
                readMoreLink.target = '_blank';
                newsArticle.appendChild(readMoreLink);
                
                newsContainer.appendChild(newsArticle);
            });
        }
    }

    function searchNews() {
        const query = searchInput.value;
        fetchNews(query);
    }

    fetchNews('latest');

    searchButton.addEventListener('click', searchNews);
});
