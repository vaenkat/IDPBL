/**
 * Building Data Structure
 * Contains room definitions and their coordinates for all floors
 * 
 * IMPORTANT: Update the coordinates (x, y) based on your actual floor plans!
 * x = horizontal distance in pixels from left
 * y = vertical distance in pixels from top
 */

const BUILDING_DATA = {
    1: {
        name: "Floor 1 - Ground Floor",
        rooms: {
            "Main Entrance": { x: 50, y: 100, floor: 1 },
            "Reception": { x: 150, y: 100, floor: 1 },
            "Waiting Area": { x: 250, y: 100, floor: 1 },
            "Office 101": { x: 100, y: 200, floor: 1 },
            "Office 102": { x: 200, y: 200, floor: 1 },
            "Office 103": { x: 300, y: 200, floor: 1 },
            "Conference Room A": { x: 150, y: 300, floor: 1 },
            "Cafeteria": { x: 300, y: 350, floor: 1 },
            "Bathroom 1F": { x: 50, y: 350, floor: 1 },
            "Storage 1F": { x: 400, y: 150, floor: 1 }
        }
    },
    2: {
        name: "Floor 2",
        rooms: {
            "Office 201": { x: 100, y: 150, floor: 2 },
            "Office 202": { x: 200, y: 150, floor: 2 },
            "Office 203": { x: 300, y: 150, floor: 2 },
            "Lab 201": { x: 150, y: 250, floor: 2 },
            "Lab 202": { x: 250, y: 250, floor: 2 },
            "Conference Room B": { x: 350, y: 200, floor: 2 },
            "Break Room 2F": { x: 100, y: 320, floor: 2 },
            "Bathroom 2F": { x: 350, y: 320, floor: 2 },
            "Server Room": { x: 50, y: 80, floor: 2 }
        }
    },
    3: {
        name: "Floor 3",
        rooms: {
            "Office 301": { x: 100, y: 120, floor: 3 },
            "Office 302": { x: 200, y: 120, floor: 3 },
            "Office 303": { x: 300, y: 120, floor: 3 },
            "Classroom 301": { x: 150, y: 230, floor: 3 },
            "Classroom 302": { x: 300, y: 230, floor: 3 },
            "Library": { x: 100, y: 320, floor: 3 },
            "Study Area": { x: 250, y: 320, floor: 3 },
            "Bathroom 3F": { x: 350, y: 280, floor: 3 },
            "Print Room": { x: 50, y: 200, floor: 3 }
        }
    },
    4: {
        name: "Floor 4",
        rooms: {
            "Office 401": { x: 100, y: 130, floor: 4 },
            "Office 402": { x: 200, y: 130, floor: 4 },
            "Office 403": { x: 300, y: 130, floor: 4 },
            "Meeting Room 1": { x: 150, y: 240, floor: 4 },
            "Meeting Room 2": { x: 300, y: 240, floor: 4 },
            "Executive Suite": { x: 100, y: 340, floor: 4 },
            "Bathroom 4F": { x: 350, y: 300, floor: 4 },
            "Lounge": { x: 200, y: 330, floor: 4 }
        }
    },
    5: {
        name: "Floor 5 - Top Floor",
        rooms: {
            "Board Room": { x: 150, y: 150, floor: 5 },
            "Office 501": { x: 100, y: 250, floor: 5 },
            "Office 502": { x: 200, y: 250, floor: 5 },
            "Office 503": { x: 300, y: 250, floor: 5 },
            "Terrace": { x: 250, y: 80, floor: 5 },
            "VIP Lounge": { x: 100, y: 80, floor: 5 },
            "Bathroom 5F": { x: 350, y: 250, floor: 5 }
        }
    },

    // Vertical transportation
    stairs: [
        { x: 450, y: 200, floors: [1, 2, 3, 4, 5], name: "Main Staircase" }
    ],

    elevators: [
        { x: 480, y: 200, floors: [1, 2, 3, 4, 5], name: "Elevator 1" },
        { x: 510, y: 200, floors: [1, 2, 3, 4, 5], name: "Elevator 2" }
    ]
};

/**
 * Get all rooms as a flat array of room names
 */
function getRoomsAsArray() {
    const rooms = [];
    for (let floor = 1; floor <= 5; floor++) {
        if (BUILDING_DATA[floor] && BUILDING_DATA[floor].rooms) {
            Object.keys(BUILDING_DATA[floor].rooms).forEach(roomName => {
                rooms.push(roomName);
            });
        }
    }
    return rooms.sort();
}

/**
 * Get all rooms as object with floor info
 */
function getAllRooms() {
    const allRooms = {};
    for (let floor = 1; floor <= 5; floor++) {
        if (BUILDING_DATA[floor] && BUILDING_DATA[floor].rooms) {
            Object.assign(allRooms, BUILDING_DATA[floor].rooms);
        }
    }
    return allRooms;
}

/**
 * Get a specific room by name
 */
function getRoom(roomName) {
    const allRooms = getAllRooms();
    return allRooms[roomName] || null;
}

/**
 * Get all rooms on a specific floor
 */
function getRoomsByFloor(floor) {
    const rooms = {};
    if (BUILDING_DATA[floor] && BUILDING_DATA[floor].rooms) {
        Object.assign(rooms, BUILDING_DATA[floor].rooms);
    }
    
    // Add stairs and elevators
    if (BUILDING_DATA.stairs) {
        BUILDING_DATA.stairs.forEach(stair => {
            if (stair.floors.includes(floor)) {
                rooms[stair.name] = { x: stair.x, y: stair.y };
            }
        });
    }
    
    if (BUILDING_DATA.elevators) {
        BUILDING_DATA.elevators.forEach((elev, idx) => {
            if (elev.floors.includes(floor)) {
                rooms[elev.name || `Elevator ${idx + 1}`] = { x: elev.x, y: elev.y };
            }
        });
    }
    
    return rooms;
}

/**
 * Get distance between two rooms
 */
function getDistance(room1, room2) {
    if (!room1 || !room2) return Infinity;
    const dx = room1.x - room2.x;
    const dy = room1.y - room2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Get all stairs in the building
 */
function getStairs() {
    return BUILDING_DATA.stairs || [];
}

/**
 * Get all elevators in the building
 */
function getElevators() {
    return BUILDING_DATA.elevators || [];
}

/**
 * Check if two rooms are on the same floor
 */
function onSameFloor(room1Name, room2Name) {
    const room1 = getRoom(room1Name);
    const room2 = getRoom(room2Name);
    return room1 && room2 && room1.floor === room2.floor;
}

/**
 * Get the connectivity distance threshold (max distance between connected rooms on same floor)
 */
function getConnectivityThreshold() {
    return 400; // pixels
}

console.log('🏢 Building data loaded successfully');
console.log(`📊 Total rooms: ${Object.keys(getAllRooms()).length}`);
console.log(`🔢 Floors: ${Object.keys(BUILDING_DATA).filter(k => !isNaN(k)).length}`);
