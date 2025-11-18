const dataService = {
    memes: [],
    
    async fetchMemes() {
        try {
            const response = await fetch('./data/data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.memes = await response.json();
            return this.memes;
        } catch (error) {
            console.error('Error fetching memes:', error);
            throw error;
        }
    },
    
    getAllMemes() {
        return this.memes;
    },
    
    filterByYear(yearRange) {
        if (yearRange === 'all') {
            return this.memes;
        }
        
        const [startYear, endYear] = yearRange.split('-').map(Number);
        return this.memes.filter(meme => meme.year >= startYear && meme.year <= endYear);
    },
    
    filterByCategory(category) {
        if (category === 'all') {
            return this.memes;
        }
        return this.memes.filter(meme => meme.category === category);
    },
    
    filterBySearch(searchTerm) {
        if (!searchTerm) {
            return this.memes;
        }
        const term = searchTerm.toLowerCase();
        return this.memes.filter(meme => 
            meme.title.toLowerCase().includes(term)
        );
    },
    
    // Filtert op jaar, categorie en zoekterm
    filterMemes(yearRange, category, searchTerm = '') {
        let filtered = this.memes;
        
        if (yearRange !== 'all') {
            const [startYear, endYear] = yearRange.split('-').map(Number);
            filtered = filtered.filter(meme => meme.year >= startYear && meme.year <= endYear);
        }
        
        if (category !== 'all') {
            filtered = filtered.filter(meme => meme.category === category);
        }
        
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(meme => 
                meme.title.toLowerCase().includes(term)
            );
        }
        
        return filtered;
    },
    
    getCategories() {
        const categories = [...new Set(this.memes.map(meme => meme.category))];
        return categories.sort();
    }
};

export default dataService;
