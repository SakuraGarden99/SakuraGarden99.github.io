function toggleAdditionalField() {
    var qcSelect = document.getElementById('qc');
    var additionalField = document.getElementById('additionalField');

    // If 'No' is selected, show the additional field; otherwise, hide it
    if (qcSelect.value === 'No') {
        additionalField.style.display = 'block';
    } else {
        additionalField.style.display = 'none';
    }
}

// Add event listener to the asinSelect dropdown
document.getElementById('asinSelect').addEventListener('change', function () {
    var asinSelect = document.getElementById('asinSelect');
    var custom_asin = document.getElementById('custom_asin');

    // Check if ASIN option is selected
    if (asinSelect.value === 'ASIN') {
        // Show the boxNumberField
        boxNumberField.style.display = 'block';
        imageUploadField.style.display = 'block';
    } else {
        // Hide the boxNumberField
        boxNumberField.style.display = 'none';
        imageUploadField.style.display = 'none';
    }
});

// Add event listener to the custom_asin input field


// Add event listener to the custom_box_number input field





let jsonString = [];
let currentIndex = 0;

function submitForm(event) {
    event.preventDefault();

    const searchValue = document.getElementById("search").value;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "token 0ea4f0ee1c773b5:23499b78d820cdc");
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://89.116.122.152:13000//api/method/luckybee_customization.luckybee_customization.api.GRN.get_fields?purchase_invoice=" + searchValue, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            jsonString = data.message;
            currentIndex = 0; // Reset currentIndex when new data is fetched
            displayCurrentItem();
        })
        .catch((error) => console.error(error));




}

function displayCurrentItem() {
    const currentItem = jsonString[currentIndex];
    if (currentItem) {
        document.getElementById('item_name').value = currentItem.item_name;
        document.getElementById('description').value = currentItem.description;
        document.getElementById('brand').value = currentItem.brand;
        document.getElementById('rate').value = currentItem.rate;
        document.getElementById('qty').value = currentItem.qty;
        document.getElementById('qc').checked = currentItem.qc || false;
        document.getElementById('received_qty').value = currentItem.received_qty;
        document.getElementById('custom_box_number').value = currentItem.custom_box_number;
        document.getElementById('image').value = currentItem.image;
        document.getElementById('custom_asin').value = currentItem.custom_asin
        document.getElementById('ean').value = currentItem.ean
        document.getElementById('subcategory').value = currentItem.subcategory
        //document.getElementById('custom_asin').value = currentItem.custom_asin

        //document.getElementById()
    } else {
        // Handle the case when currentItem is not available
        // For example, display a message or clear the fields
    }
}

function next() {
    saveData()
    if (currentIndex < jsonString.length - 1) {
        currentIndex++;
        displayCurrentItem();
    }
}

function previous() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCurrentItem();
    }
}

// document.getElementById('scan-button').addEventListener('click', function () {
//     // Open a new popup window for the scanner
//     var scannerWindow = window.open('scanner.html', '_blank', 'width=400,height=400');
// });

// // Function to update the current item with the values from the form fields


function next() {
    saveData(); // Save data before moving to the next item
    if (currentIndex < jsonString.length - 1) {
        currentIndex++;
        displayCurrentItem();
    }
}

function updateCurrentItem() {
    const currentItem = jsonString[currentIndex];
    if (currentItem) {
        currentItem.item_name = document.getElementById('item_name').value;
        currentItem.description = document.getElementById('description').value;
        currentItem.brand = document.getElementById('brand').value;
        currentItem.rate = document.getElementById('rate').value;
        currentItem.qty = document.getElementById('qty').value;
        currentItem.qc = document.getElementById('qc').checked;
        currentItem.received_qty = document.getElementById('received_qty').value;
        currentItem.custom_box_number = document.getElementById('custom_box_number').value;
        currentItem.image = document.getElementById('image').value;
        currentItem.custom_asin = document.getElementById('custom_asin').value;
        currentItem.ean = document.getElementById('ean').value;
        currentItem.subcategory = document.getElementById('subcategory').value;
    }
}

function printBarcode(){
    var item_code = document.getElementById("item_name").value;
    console.log(item_code)
    var barcodeWindow = window.open('');
    barcodeWindow.document.write('<svg id="barcode"></svg>');
    
    JsBarcode(barcodeWindow.document.getElementById("barcode"), item_code, {
            height: 50,
            text: "rate",
            displayValue: true // Whether to display the human-readable value below the barcode
        });
    
    barcodeWindow.print();
    barcodeWindow.close();
}