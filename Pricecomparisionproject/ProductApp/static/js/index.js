function fetchAllProducts() {
    $.ajax({
        url: '/api/products/',
        type: 'GET',
        success: function(data) {
            displayProducts(data);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching products:', error);
        }
    });
}

// Function to display products in the table
function displayProducts(products) {
    var productList = $('#productList');
    productList.empty();  // Clear any existing products

    products.forEach(function(product,index) {
        var productRow = `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.retailer}</td>
                <td>
                    <button class="btn btn-success" onclick="viewProduct(${product.id})">View</button>
                    <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        productList.append(productRow);
    });
}

// Function to handle product editing
function editProduct(productId) {
    // Fetch the product details and populate the edit form
    $.ajax({
        url: `/api/products/${productId}/`,
        type: 'GET',
        success: function(product) {
            $('#editProductId').val(product.id);
            $('#editProductName').val(product.name);
            $('#editProductPrice').val(product.price);
            $('#editProductRetailer').val(product.retailer);
            $('#editProductModal').modal('show');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching product:', error);
        }
    });
}

function viewProduct(productId) {
    // Fetch the product details and populate the view modal
    $.ajax({
        url: `/api/products/${productId}/`,
        type: 'GET',
        success: function(product) {
            $('#viewProductId').text(product.id);
            $('#viewProductName').text(product.name);
            $('#viewProductPrice').text(product.price);
            $('#viewProductRetailer').text(product.retailer);
            $('#viewProductModal').modal('show');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching product:', error);
        }
    });
}


// Handle form submission for editing a product
$('#editProductForm').submit(function(event) {
    event.preventDefault();

    var productId = $('#editProductId').val();
    var updatedProduct = {
        name: $('#editProductName').val(),
        price: $('#editProductPrice').val(),
        retailer: $('#editProductRetailer').val()
    };

    $.ajax({
        url: `/api/products/${productId}/`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedProduct),
        success: function(data) {
            $('#editProductModal').modal('hide');
            fetchAllProducts();  // Refresh the product list
        },
        error: function(xhr, status, error) {
            console.error('Error updating product:', error);
        }
    });
});

// Function to handle product deletion
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        $.ajax({
            url: `/api/products/${productId}/`,
            type: 'DELETE',
            success: function(data) {
                fetchAllProducts();  // Refresh the product list
            },
            error: function(xhr, status, error) {
                console.error('Error deleting product:', error);
            }
        });
    }
}

// Fetch all products when the page loads
$(document).ready(function() {
    fetchAllProducts();
});



  // Function to check if HTTP method is safe for CSRF token
  function csrfSafeMethod(method) {
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

// Obtain CSRF token from meta tag (adjust as per your Django setup)
var csrftoken = $('meta[name=csrf-token]').attr('content');

// AJAX setup for CSRF token inclusion
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        }
    }
});

// jQuery submit handler for adding a product
$('#addProductForm').submit(function(event) {
    event.preventDefault();  // Prevent default form submission

    var productName = $('#name').val();
    var productPrice = $('#price').val();
    var productRetailer = $('#retailer').val();

    
    if (!productName) {
        $('#nameError').text('Please fill out this field.');
         isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(productName)) {
        console.error('All fields are required.');
        $('#nameError').text('Product name should not contain numbers or special characters.');
        isValid = false;
    }
    
    // Validate product price (greater than zero)
    if (!productPrice) {
        $('#priceError').text('Please fill out this field.');
        isValid = false;
    } else if (parseFloat(productPrice) <= 0) {
        $('#priceError').text('Price must be greater than zero.');
        isValid = false;
    }
    
    // Ensure retailer is not empty
    if (!productRetailer) {
        $('#retailerError').text('Please fill out this field.');
        isValid = false;
    }

    if (!productName || !productPrice || !productRetailer) {
        console.error('All fields are required.');
        return;  // Prevent further execution if fields are empty
    }

    var formData = {
        name: productName,
        price: productPrice,
        retailer: productRetailer
    };

    // AJAX POST request to add product
    $.ajax({
        url: '/api/productsdata/',  // Adjust URL as per your backend API endpoint
        type: 'POST',
        data: formData,
        success: function(data) {
            console.log('Product added successfully:', data);            
            $('#addProductModal').modal('hide');
            showMessage('Product added successfully.', 'Success');
        //    location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error adding product:', error);
            showMessage('Error adding product: ' + error, 'Error');
        }
    });
});


// Function to show message in modal (optional, for error handling)
function showMessage(message, title) {
    $('#messageModalLabel').text(title);
    $('#messageModalBody').text(message);
    $('#messageModal').modal('show');

    $('#messageModal').on('hidden.bs.modal', function () {
      window.location.reload();
  });
}

$('#name, #price, #retailer').focus(function() {
    $('#nameError, #priceError, #retailerError').text('');
});
