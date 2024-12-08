import requests
import json

# Data for creating tickets and transactions
ticket_data = [
    {
        "eventId": "6755b9681ff67cbf5cc4afbf",
        "ticketType": "VIP",
        "price": 100,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-1",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-05T10:30:00.000Z"
    },
    {
        "eventId": "6755ba391ff67cbf5cc4afc7",
        "ticketType": "General",
        "price": 50,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-2",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-06T11:00:00.000Z"
    },
    {
        "eventId": "6755ba391ff67cbf5cc4afcd",
        "ticketType": "VIP",
        "price": 120,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-3",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-07T12:00:00.000Z"
    },
    {
        "eventId": "6755ba391ff67cbf5cc4afd3",
        "ticketType": "General",
        "price": 60,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-4",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-08T14:00:00.000Z"
    },
    {
        "eventId": "6755ba391ff67cbf5cc4afd9",
        "ticketType": "VIP",
        "price": 150,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-5",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-09T16:00:00.000Z"
    },
    {
        "eventId": "6755ba391ff67cbf5cc4afdf",
        "ticketType": "General",
        "price": 75,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-6",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-10T17:00:00.000Z"
    },
    {
        "eventId": "6755ba391ff67cbf5cc4afe5",
        "ticketType": "VIP",
        "price": 130,
        "purchaserId": "6755b88f1ff67cbf5cc4af91",
        "status": "active",
        "qrCode": "random-qr-code-7",
        "qrCodeImageUrl": "60d2b5f0c8f8e1b77b6b85d9",
        "purchaseDate": "2024-12-11T19:30:00.000Z"
    }
]

transaction_data = [
    {
        "ticketId": "6755b9681ff67cbf5cc4afbf",
        "userId": "6755b88f1ff67cbf5cc4af91",
        "amount": 100,
        "paymentMethod": "Credit Card",
        "transactionId": "txn_1234567890_1",
        "status": "successful",
        "createdAt": "2024-12-05T10:32:00.000Z",
        "updatedAt": "2024-12-05T10:32:00.000Z"
    },
    {
        "ticketId": "6755ba391ff67cbf5cc4afc7",
        "userId": "6755b88f1ff67cbf5cc4af91",
        "amount": 50,
        "paymentMethod": "PayPal",
        "transactionId": "txn_1234567890_2",
        "status": "successful",
        "createdAt": "2024-12-06T11:05:00.000Z",
        "updatedAt": "2024-12-06T11:05:00.000Z"
    },
    {
        "ticketId": "6755ba391ff67cbf5cc4afcd",
        "userId": "6755b88f1ff67cbf5cc4af91",
        "amount": 120,
        "paymentMethod": "Debit Card",
        "transactionId": "txn_1234567890_3",
        "status": "successful",
        "createdAt": "2024-12-07T12:05:00.000Z",
        "updatedAt": "2024-12-07T12:05:00.000Z"
    }
]

# URL for creating tickets (Use localhost or the actual IP address instead of "local")
ticket_url = "http://localhost:3005/ticket/create/"

# Send POST request to create tickets
response = requests.post(ticket_url, json=ticket_data)

# Check the response
if response.status_code == 200:
    print("Tickets created successfully")
else:
    print(f"Failed to create tickets: {response.status_code} - {response.text}")

# URL for creating transactions (Use localhost or the actual IP address instead of "local")
transaction_url = "http://localhost:3005/transaction/create/"

# Send POST request to create transactions
response = requests.post(transaction_url, json=transaction_data)

# Check the response
if response.status_code == 200:
    print("Transactions created successfully")
else:
    print(f"Failed to create transactions: {response.status_code} - {response.text}")
