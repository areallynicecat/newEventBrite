import requests

data = [
    {
        "name": "Tech Expo 2024",
        "description": "Explore the latest in technology and innovation.",
        "date": "2024-12-20",
        "location": "San Francisco, CA",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "General", "price": 30, "quantity": 100 },
            { "type": "Premium", "price": 100, "quantity": 50 }
        ],
        "organizerId": "6755a6d7d686b1da6c842e2f",
        "eventImage": "https://marketplace.canva.com/EAFH0H90V7Y/1/0/1600w/canva-yellow-illustrated-music-festival-poster-landscape-IuDAkfyDlZs.jpg"
    },
    {
        "name": "Art & Culture Fair",
        "description": "Showcasing art from around the world.",
        "date": "2024-12-18",
        "location": "Chicago, IL",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Adult", "price": 25, "quantity": 100 },
            { "type": "Child", "price": 10, "quantity": 100 }
        ],
        "organizerId": "6755a6d7d686b1da6c842e2f",
        "eventImage": "https://static.vecteezy.com/system/resources/thumbnails/002/088/828/small_2x/summer-art-and-culture-exhibition-colorful-poster-design-free-vector.jpg"
    },
    {
        "name": "Food Carnival",
        "description": "A paradise for food lovers.",
        "date": "2024-12-22",
        "location": "Los Angeles, CA",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Entry", "price": 20, "quantity": 100 },
            { "type": "Unlimited Tasting", "price": 50, "quantity": 50 }
        ],
        "organizerId": "6755a6d7d686b1da6c842e2f",
        "eventImage": "https://ih1.redbubble.net/image.753840491.4558/fposter,small,wall_texture,square_product,600x600.u1.jpg"
    },
    {
        "name": "Marathon 2024",
        "description": "Run for a cause in the annual marathon.",
        "date": "2024-12-25",
        "location": "Boston, MA",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Runner", "price": 40, "quantity": 200 },
            { "type": "Spectator", "price": 10, "quantity": 300 }
        ],
        "organizerId": "6755a6d7d686b1da6c842e2f",
        "eventImage": "https://static.vecteezy.com/system/resources/thumbnails/013/132/816/small_2x/new-york-marathon-free-vector.jpg"
    },
    {
        "name": "Startup Pitch Night",
        "description": "Pitch your ideas to top investors.",
        "date": "2024-12-16",
        "location": "Austin, TX",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Participant", "price": 60, "quantity": 50 },
            { "type": "Viewer", "price": 20, "quantity": 100 }
        ],
        "organizerId": "6755a6d7d686b1da6c842e2f",
        "eventImage": "https://static.vecteezy.com/system/resources/thumbnails/013/132/816/small_2x/new-york-marathon-free-vector.jpg"
    },
    {
        "name": "Christmas Market",
        "description": "Celebrate the season with festive shopping.",
        "date": "2024-12-21",
        "location": "Denver, CO",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Entry", "price": 5, "quantity": 100 }
        ],
        "organizerId": "6755a6d7d686b1da6c842e2f",
        "eventImage": "https://www.newparkschool.ie/wp-content/uploads/2022/11/Newpark-Christmas-Market-Poster-2022-scaled.jpg"
    },
    {
        "name": "Gaming Tournament",
        "description": "Compete in the ultimate gaming battle.",
        "date": "2024-12-19",
        "location": "Seattle, WA",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Participant", "price": 30, "quantity": 200 },
            { "type": "Spectator", "price": 15, "quantity": 300 }
        ],
        "organizerId": "org130",
        "eventImage": "https://marketplace.canva.com/EAFrOFi-2xE/1/0/1131w/canva-black-and-blue-bold-game-tournament-poster-84eTZ9XANfE.jpg"
    },
    {
        "name": "Health & Wellness Retreat",
        "description": "Rejuvenate your mind and body.",
        "date": "2024-12-23",
        "location": "Sedona, AZ",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Day Pass", "price": 100, "quantity": 50 },
            { "type": "Full Retreat", "price": 500, "quantity": 30 }
        ],
        "organizerId": "org131",
        "eventImage": "https://marketplace.canva.com/EAFrOFi-2xE/1/0/1131w/canva-black-and-blue-bold-game-tournament-poster-84eTZ9XANfE.jpg"
    },
    {
        "name": "Comedy Night",
        "description": "An evening of laughter with top comedians.",
        "date": "2024-12-17",
        "location": "Las Vegas, NV",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "General", "price": 40, "quantity": 100 },
            { "type": "Front Row", "price": 100, "quantity": 50 }
        ],
        "organizerId": "org132",
        "eventImage": "https://res.cloudinary.com/democratsabroad/image/upload/v1724916974/Comedy_Night_Banner_pr9qab.png"
    },
    {
        "name": "Photography Workshop",
        "description": "Learn the art of photography from professionals.",
        "date": "2024-12-26",
        "location": "Miami, FL",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Beginner", "price": 80, "quantity": 100 },
            { "type": "Advanced", "price": 150, "quantity": 50 }
        ],
        "organizerId": "org133",
        "eventImage": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/photography-workshop-poster-template-154f438351025f6c6b981e34e499fd80_screen.jpg?ts=1636971157"
    },
    {
        "name": "Film Festival",
        "description": "Experience the best in independent cinema.",
        "date": "2024-12-27",
        "location": "Atlanta, GA",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Single Screening", "price": 12, "quantity": 200 },
            { "type": "Full Access", "price": 50, "quantity": 50 }
        ],
        "organizerId": "org134",
        "eventImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_U9_v_22PMBRBcrISwhhQUW6qRpk0Ihaz6w&s"
    },
    {
        "name": "Fashion Gala",
        "description": "A showcase of stunning fashion designs.",
        "date": "2024-12-28",
        "location": "Dallas, TX",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "General", "price": 100, "quantity": 100 },
            { "type": "VIP", "price": 250, "quantity": 50 }
        ],
        "organizerId": "org135",
        "eventImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_U9_v_22PMBRBcrISwhhQUW6qRpk0Ihaz6w&s"
    },
    {
        "name": "Science Exhibition",
        "description": "Discover the wonders of science and technology.",
        "date": "2024-12-29",
        "location": "Houston, TX",
        "ticketTypes": [
            { "type": "General", "price": 50, "quantity": 100 },
            { "type": "VIP", "price": 150, "quantity": 50 },
            { "type": "Entry", "price": 20, "quantity": 100 },
            { "type": "Family Pack", "price": 50, "quantity": 50 }
        ],
        "organizerId": "org136",
        "eventImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_U9_v_22PMBRBcrISwhhQUW6qRpk0Ihaz6w&s"
    }
]

for payload in data:
    res = requests.post('http://localhost:3005/create-event', json=payload)
    print(res.status_code)
