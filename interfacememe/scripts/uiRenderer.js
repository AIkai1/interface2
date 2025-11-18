const uiRenderer = {
    memesContainer: null,
    loadingElement: null,
    
    init() {
        this.memesContainer = document.getElementById('memes-container');
        this.loadingElement = document.getElementById('loading');
    },
    
    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }
    },
    
    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
    },
    
    // Toont memes met GSAP animatie
    renderMemes(memes) {
        if (!this.memesContainer) return;
        
        if (memes.length === 0) {
            this.memesContainer.innerHTML = '<p class="no-results">No memes found matching your filters.</p>';
            return;
        }
        
        const memesHTML = memes.map(meme => `
            <div class="meme-card">
                <div class="meme-image">
                    <img src="./img/${meme.image}" alt="${meme.title}" onerror="this.src='./img/placeholder.jpg'">
                </div>
                <div class="meme-content">
                    <h3 class="meme-title">${meme.title}</h3>
                    <p class="meme-year">${meme.year}</p>
                    <p class="meme-category">${meme.category}</p>
                    <p class="meme-description">${meme.description}</p>
                </div>
            </div>
        `).join('');
        
        this.memesContainer.innerHTML = memesHTML;
        
        const cards = this.memesContainer.querySelectorAll('.meme-card');
        gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    },
    
    renderFilters(categories) {
        const filtersContainer = document.getElementById('filters');
        if (!filtersContainer) return;
        
        const yearOptions = `
            <option value="all">All Years</option>
            <option value="2007-2010">2007-2010</option>
            <option value="2011-2015">2011-2015</option>
            <option value="2016-2020">2016-2020</option>
        `;
        
        const categoryOptions = [
            '<option value="all">All Categories</option>',
            ...categories.map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`)
        ].join('');
        
        filtersContainer.innerHTML = `
            <div class="filter-group">
                <label for="search-filter">Search:</label>
                <input type="text" id="search-filter" placeholder="Search by title...">
            </div>
            <div class="filter-group">
                <label for="year-filter">Year:</label>
                <select id="year-filter">
                    ${yearOptions}
                </select>
            </div>
            <div class="filter-group">
                <label for="category-filter">Category:</label>
                <select id="category-filter">
                    ${categoryOptions}
                </select>
            </div>
        `;
    },
    
    showError(message) {
        if (this.memesContainer) {
            this.memesContainer.innerHTML = `
                <div class="error-message">
                    <p>${message}</p>
                    <p>Please try again later.</p>
                </div>
            `;
        }
    }
};

export default uiRenderer;
