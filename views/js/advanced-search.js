$(document).ready(function () {

    $("#submit").on("submit", function (e) {

        e.preventDefault();

        let max_ibu = $('#max_ibu').val();
        let min_ibu = $('#min_ibu').val();
        let max_abv = $('#max_abv').val();
        let min_abv = $('#min_abv').val();
        let max_ebc = $('#max_ebc').val();
        let min_ebc = $('#min_ebc').val();
        let brewed_before = $('#brewed_before').val();
        let brewed_after = $('#brewed_after').val();

        let url = 'https://api.punkapi.com/v2/beers?';

        if (max_ibu.length > 0) {
            url += 'ibu_gt=' + max_ibu + ' ';
        }
        if (min_ibu.length > 0) {
            url=url.replace(' ','&');
            url += 'ibu_lt=' + min_ibu + ' ';
        }
        if (max_abv.length > 0) { 

            url=url.replace(' ','&');
            url += 'abv_gt=' + max_abv + ' '; 
        }
        if (min_abv.length > 0) {

            url=url.replace(' ','&');
            url += 'abv_lt=' + min_abv + ' ';
        }
        if (max_ebc.length > 0) {

            url=url.replace(' ','&');
            url += 'ebc_gt=' + max_ebc + ' ';
        }
        if (min_ebc.length > 0) {

            url=url.replace(' ','&');
            url += 'ebc_lt=' + min_ebc + ' ';
        }
        if (brewed_before.length > 0) {

            url=url.replace(' ','&');
            url += 'brewed_before=' + brewed_before + ' ';
        }
        if (brewed_after.length > 0) {

            url=url.replace(' ','&');
            url += 'brewed_after=' + brewed_after + ' ';
        }

        url = url.trim();

        console.log(url);

        /*$.get(url, function (response) {

            console.log(response);

        });*/
    })
});