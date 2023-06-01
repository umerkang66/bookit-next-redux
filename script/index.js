const fs = require('fs');
const path = require('path');
const axios = require('axios');

const rooms = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'rooms.json'), 'utf-8')
);

const createRooms = async () => {
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    await axios.post('http://localhost:3000/api/admin/rooms', room);
    console.log(`Room #${i} created`);
  }
};

createRooms();
