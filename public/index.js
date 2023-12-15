$(document).ready(()=>{
    let currentPage = 0, pageSize = 5;

    let jqxhr = $.getJSON('/items');
    
    jqxhr.done(({ articles }) =>{
        showArticles(articles);

        $('.pagination-next').click(()=>{
            if(currentPage*pageSize+pageSize < articles.length) currentPage++; else return;
            showArticles(articles);
        });
        $('.pagination-prev').click(()=>{
            if(currentPage <= 0) return;
            currentPage--;
            showArticles(articles);
        });
    });

    function showArticles(articles){
        $('.articles').html('');
        articles.slice(currentPage * pageSize, currentPage * pageSize + pageSize).forEach(({ title, fields, photo }) => {
            $('.articles').append(`
                <div class="article">
                    <img src="${photo}">
                    <div class="description">
                        <span class="title">${title}</span>
                        <span class="fields">${fields}</span>
                    </div>
                </div>
            `);
        });
    }
});