$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/api/athletes/',
            contentType: 'app/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.products.forEach(function(athlete) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + athlete.id + '</td>\
                            <td><input type="text" class="name" value="' + athlete.name + '"></td>\
                            <td><input type="text" class="sex" value="' + athlete.sex + '"></td>\
                            <td><input type="number" class="age" value="' + athlete.age + '"></td>\
                            <td><input type="text" class="discipline" value="' + athlete.discipline + '"></td>\
                            <td>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/api/athletes/',
            method: 'POST',
            contentType: 'app/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/api/products/' + id,
            method: 'DELETE',
            contentType: 'app/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});