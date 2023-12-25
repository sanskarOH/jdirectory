document.addEventListener('DOMContentLoaded', function () {
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
            fetchAndDisplayData(); // Reload data without full page refresh
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
                        <strong>Address:</strong> ${item.address}
                        <button class="deleteButton" data-id="${item._id}">❌</button>
                        `;
        ul.appendChild(li);
    });

    addressListElement.innerHTML = '';
    addressListElement.appendChild(ul);

    // Add event listener to dynamically added delete buttons
    ul.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteButton')) {
            const entryId = event.target.getAttribute('data-id');
            console.log(entryId);
            deleteEntry(entryId);
        }
    });
}

function deleteEntry(entryId) {
    fetch(`http://localhost:3000/api/delete/${entryId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                // Entry deleted successfully, fetch and render updated data
                fetchAndDisplayData();
            } else {
                console.error('Failed to delete entry:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting entry:', error));
}

function displayResponse(responseData) {
    const apiResponseElement = document.getElementById('apiResponse');
    apiResponseElement.innerHTML = `<p>API Response: ${JSON.stringify(responseData)}</p>`;
}

function displayError() {
    const apiResponseElement = document.getElementById('apiResponse');
    apiResponseElement.innerHTML = '<p>Error fetching data from the API</p>';
}
