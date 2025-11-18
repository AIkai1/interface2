import dataService from "./dataService.js";
import uiRenderer from "./uiRenderer.js";

const app = {
    currentYearFilter: 'all',
    currentCategoryFilter: 'all',
    currentSearchTerm: '',
    
    async init() {
        uiRenderer.init();
        uiRenderer.showLoading();
        
        try {
            await dataService.fetchMemes();
            uiRenderer.hideLoading();
            
            const categories = dataService.getCategories();
            uiRenderer.renderFilters(categories);
            
            this.loadFiltersFromStorage();
            this.applyFilters();
            this.setupEventListeners();
        } catch (error) {
            uiRenderer.hideLoading();
            uiRenderer.showError('Failed to load memes data.');
        }
    },
    
    // Laadt opgeslagen filters uit localStorage
    loadFiltersFromStorage() {
        const savedYear = localStorage.getItem('memeYearFilter');
        const savedCategory = localStorage.getItem('memeCategoryFilter');
        const savedSearch = localStorage.getItem('memeSearchTerm');
        
        if (savedYear) {
            this.currentYearFilter = savedYear;
            const yearSelect = document.getElementById('year-filter');
            if (yearSelect) yearSelect.value = savedYear;
        }
        
        if (savedCategory) {
            this.currentCategoryFilter = savedCategory;
            const categorySelect = document.getElementById('category-filter');
            if (categorySelect) categorySelect.value = savedCategory;
        }
        
        if (savedSearch) {
            this.currentSearchTerm = savedSearch;
            const searchInput = document.getElementById('search-filter');
            if (searchInput) searchInput.value = savedSearch;
        }
    },
    
    // Slaat filters op in localStorage
    saveFiltersToStorage() {
        localStorage.setItem('memeYearFilter', this.currentYearFilter);
        localStorage.setItem('memeCategoryFilter', this.currentCategoryFilter);
        localStorage.setItem('memeSearchTerm', this.currentSearchTerm);
    },
    
    setupEventListeners() {
        const yearFilter = document.getElementById('year-filter');
        const categoryFilter = document.getElementById('category-filter');
        const searchFilter = document.getElementById('search-filter');
        
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.currentYearFilter = e.target.value;
                this.saveFiltersToStorage();
                this.applyFilters();
            });
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentCategoryFilter = e.target.value;
                this.saveFiltersToStorage();
                this.applyFilters();
            });
        }
        
        if (searchFilter) {
            searchFilter.addEventListener('input', (e) => {
                this.currentSearchTerm = e.target.value;
                this.saveFiltersToStorage();
                this.applyFilters();
            });
        }
    },
    
    applyFilters() {
        const filteredMemes = dataService.filterMemes(
            this.currentYearFilter,
            this.currentCategoryFilter,
            this.currentSearchTerm
        );
        uiRenderer.renderMemes(filteredMemes);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
