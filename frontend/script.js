document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayData();
});

function sendData() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('http://localhost:3000/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Response:', responseData);
        displayResponse(responseData);
        location.reload();
        fetchAndDisplayData();
    })
    .catch(error => {
        console.error('Error:', error.message);
        displayError();
    });
}

function fetchAndDisplayData() {
    fetch('http://localhost:3000/api/getAll') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayAddressList(data);
        })
        .catch(error => {
            console.error('Error:', error.message);
            displayError();
        });
}

function displayAddressList(data) {
    const addressListElement = document.getElementById('addressList');

    if (data.length === 0) {
        addressListElement.innerHTML = '<p>No addresses found.</p>';
        return;
    }

    const ul = document.createElement('ul');

    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Name:</strong> ${item.name}<br>
                        <strong>Phone:</strong> ${item.phonenumber}<br>
                        <strong>Address:</strong> ${item.address}`;
        ul.appendChild(li);
    });

    addressListElement.innerHTML = '';
    addressListElement.appendChild(ul);
}

function displayResponse(responseData) {
    const apiResponseElement = document.getElementById('apiResponse');
    apiResponseElement.innerHTML = `<p>API Response: ${JSON.stringify(responseData)}</p>`;
}

function displayError() {
    const apiResponseElement = document.getElementById('apiResponse');
    apiResponseElement.innerHTML = '<p>Error fetching data from the API</p>';
}
