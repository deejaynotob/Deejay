document.addEventListener('DOMContentLoaded', function () {
    // Initial setup
    showScreen('input-screen');

    // Event listener for the submit button
    document.getElementById('submit-button').addEventListener('click', function () {
        submitFormData();
    });

    // Event listener for the view status button
    document.getElementById('view-status-button').addEventListener('click', function () {
        showScreen('status-screen');
        updateMachineStatusOnScreen();
    });

    // Event listener for the go back to input button
    document.getElementById('go-back-to-input-button').addEventListener('click', function () {
        showScreen('input-screen');
    });

    // Event listener for the view log history button
    document.getElementById('view-log-history-button').addEventListener('click', function () {
        showScreen('log-history-screen');
        updateLogHistory();
    });

    // Event listener for the go back to status button
    document.getElementById('go-back-to-status-button').addEventListener('click', function () {
        showScreen('status-screen');
    });

    // Set the default status to an empty string for all machines
    const machineIds = [
        'RT-01', 'RT-02', 'RT-03', 'RT-04', 'RT-05', 'RT-06',
        'RT-07', 'RT-08', 'RT-09', 'RT-10', 'RT-11', 'RT-12'
    ];

    machineIds.forEach(machineId => {
        updateMachineStatusOnScreen(machineId, ''); // Set initial status to empty string
    });

    // Function to display a notification
    function displayNotification(message) {
        // Create a notification bar
        const notificationBar = document.createElement('div');
        notificationBar.className = 'notification-bar';
        notificationBar.innerHTML = `<p>${message}</p>`;

        // Append the notification bar to the body
        document.body.appendChild(notificationBar);

        // Add a class to show the notification bar
        notificationBar.classList.add('show');

        // Remove the notification bar after a certain duration (e.g., 3 seconds)
        setTimeout(() => {
            notificationBar.classList.remove('show');
        }, 1500); // Adjust the duration as needed
    }

    function submitFormData() {
        // Get input values
        const machineId = document.getElementById('machine-id').value;
        const machineStatus = document.getElementById('machine-status').value;
        const downtimeReason = document.getElementById('comments').value;
    
        // Check if the selected status is "Select Status"
        if (machineStatus === '') {
            // Display an error notification and return without recording
            displayNotification('Please select a valid machine status.');
            return;
        }
    
        console.log(`Submitting Form Data - Machine ID: ${machineId}, Status: ${machineStatus}, Reason: ${downtimeReason}`);
    
        // Display simplified notification message in the console
        displayNotification('Data Submitted Successfully');
    
        // Reset form fields
        document.getElementById('machine-id').value = 'RT-01';
        document.getElementById('machine-status').value = ''; // Set default to an empty string
        document.getElementById('comments').value = '';
    
        // Update machine status on the status screen
        updateMachineStatusOnScreen(machineId, machineStatus);
    
        // Update log history
        updateLogHistoryEntry(machineId, machineStatus, downtimeReason);
    }
    
    
});

function updateMachineStatusOnScreen(machineId, machineStatus) {
    const machineStatusContainer = document.getElementById(`machine-${machineId}`);



    const statusParagraph = machineStatusContainer.querySelector('.status');

    if (statusParagraph) {
        statusParagraph.innerText = machineStatus ? `Status: ${machineStatus}` : 'Status: Idle';

        statusParagraph.dataset.status = machineStatus; 
        switch (machineStatus) {
            case 'Running':
                machineStatusContainer.style.background = 'linear-gradient(to bottom, #008000,#00A800 )';
                break;
            case 'Down':
                machineStatusContainer.style.background = 'linear-gradient(to bottom, #990000 ,#ef0307 )';
                break;
            case 'For Qualification':
                machineStatusContainer.style.background = 'linear-gradient(to bottom, #7f8c8d,#95a5a6 )';
                break;
            case 'For Setup':
                machineStatusContainer.style.background = 'linear-gradient(to bottom, #00d5e4f8,#00eefff8 )';
                break;
            case 'For PM':
                machineStatusContainer.style.background = 'linear-gradient(to bottom, #5F04B4,#8A2BE2 )';
                break;
            default:
                machineStatusContainer.style.background = 'linear-gradient(to bottom, #f39c12,#f1c40f )';
                break;
            }
        
    }
}







function updateLogHistoryEntry(machineId, machineStatus, downtimeReason) {
    // Implement logic to update log history (can be mocked for local testing)

    // Get the current date and time
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    // Example: Add log entry to the log history content
    const logHistoryContent = document.getElementById('log-history-content');
    const logEntry = document.createElement('tr'); // Change to create a table row
    logEntry.classList.add('log-entry');

    // Create table cells
    const timestampCell = document.createElement('td');
    timestampCell.innerText = timestamp;

    const machineIdCell = document.createElement('td');
    machineIdCell.innerText = machineId;

    const statusCell = document.createElement('td');
    statusCell.innerText = machineStatus;

    const reasonCell = document.createElement('td');
    reasonCell.innerText = downtimeReason;

    // Append cells to the row
    logEntry.appendChild(timestampCell);
    logEntry.appendChild(machineIdCell);
    logEntry.appendChild(statusCell);
    logEntry.appendChild(reasonCell);

    // Insert the row at the beginning of the table (log history)
    const tbody = logHistoryContent.querySelector('tbody');
    const firstRow = tbody.querySelector('tr');
    tbody.insertBefore(logEntry, firstRow);
}


function updateLogHistory() {
    // Implement logic to fetch and update log history (can be mocked for local testing)
}

function showScreen(screenId) {
    // Hide all screens
    document.getElementById('input-screen').style.display = 'none';
    document.getElementById('status-screen').style.display = 'none';
    document.getElementById('log-history-screen').style.display = 'none';

    // Show the selected screen
    document.getElementById(screenId).style.display = 'block';

    // Update machine details on the status screen after showing it
    if (screenId === 'status-screen') {
        updateMachineStatusOnScreen();
    }
}