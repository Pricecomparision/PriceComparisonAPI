
$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();  // Prevent default form submission

        var nameQuery = $('#nameInput').val().trim();  // Assuming you have inputs with IDs 'nameInput' and 'priceInput'
        var priceQuery = $('#priceInput').val().trim();
        var retailerQuery =  $('#retailerInput').val().trim();

        // AJAX GET request to fetch search results
        $.ajax({
            url: '/api/products/',  // URL for your backend API endpoint
            type: 'GET',
            data: {
                name: nameQuery,
                price: priceQuery,
                retailer:retailerQuery
            },
            success: function(data) {
                console.log('Search results:', data);
                displayProducts(data);  // Update product list with search results
            },
            error: function(xhr, status, error) {

              //  console.log('Search results:', error);
                console.error('Error fetching search results:', error);
                showMessage('Error fetching search results: ' + error, 'Error');
            }
        });
    });

    // Function to display products in the product list container
    function displayProducts(products) {
        var productList = $('#productList');
        productList.empty();  // Clear existing products

        if (products.length === 0) {
            productList.append('<tr><td colspan="3">No products found.</td></tr>');
        } else {
            products.forEach(function(product,index) {
                var productItem = `
                    <tr>
                   
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.retailer}</td>
            </tr>
                `;
                productList.append(productItem);
            });
        }
    }

    // Function to show message in modal (optional, for error handling)
    function showMessage(message, title) {
        // You can define a modal in your HTML to show messages
   //     alert(`${title}: ${message}`);
    }
});

