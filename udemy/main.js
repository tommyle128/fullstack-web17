var nextPageUrl = null;
var loadingMore = false;

$(document).ready(function(){
    $("#loading").hide();
    $("#searchCourse").on("submit", function() {
        event.preventDefault();

        const keywoard = $("#keyword").val();
        // $("#results").html('');
        $("#results").empty(); // xóa kết quả cũ đi
        $("#loading").show();
        
        loadData(`http://api.techkids.vn/udemy/courses?search=${keyword}`);
    });

    $(window).on("scroll", function() {
        if (!loadingMore && nextPageUrl && $(document).height() - ($(window).height() + $(window).scrollTop()) < 400) {
            console.log(loadingMore);
            loadingMore = true;
            $("#loading").show();
            loadData(nextPageUrl);
        } // Nhở hơn 400 thì bắt đầu load thêm để animation được mượt ng dùng k phải chờ

    });
});

function loadData(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            const { results, next } = data;
            
            nextPageUrl = next;
            
            // [1,2,3].map(function(item, index, array) {return item*2; }) =====> [2,4,6]
            const resultsElement = results.map(function(item) {
                return `<div class="card" style="width: 20rem;">
                <img src="${item.mage_240x135}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">- Price: ${item.price}</p>
                    <p class="card-text">- Score: ${item.relevancy_score}</p>
                    <a target="_blank" href="https://www.udemy.com/${item.url}" class="btn btn-primary">View course</a>
                </div>
                </div>
                <div class="text-center">
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                `;
                
            });

            $("#results").append(resultsElement);
            $("#loading").hide();
            loadingMore = false;
        },
        error: function(err) {
            console.log("Error!!!", err);
        }
    });

};