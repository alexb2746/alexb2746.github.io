(function () {
    $(document).ajaxComplete(function() {
        $(".box").on({ mouseenter: function() {
                $(this).addClass("hover");
            },
            mouseleave: function () {
                $(this).removeClass("hover");
        }});
        $(".box").click(function () {
            let index = $(this).index('.box');
            $('#modal' + index).show();
        });
        $("span").click(function() {
            $('.modal').hide();
        });
    });
}());
