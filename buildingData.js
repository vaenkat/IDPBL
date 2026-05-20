const BUILDING_DATA = {
    1: {
        name: "Floor 1",
        rooms: {
            "Evaluation Canter": { x: 315, y: 288, floor: 1 },
            "Examination Evaluation Center - 1": { x: 1072, y: 284, floor: 1 },
            "IT Room": { x: 1118, y: 624, floor: 1 },
            "Chief Proctor Office": { x: 1120, y: 761, floor: 1 },
            "Admission Office": { x: 268, y: 773, floor: 1 },
            "NSS": { x: 269, y: 1145, floor: 1 },
            "EPFO": { x: 265, y: 1297, floor: 1 },
            "AB203": { x: 519, y: 1080, floor: 1 },
            "Counselling Room": { x: 712, y: 1078, floor: 1 },
            "Exam Room": { x: 896, y: 1081, floor: 1 },
        }
    },
    2: {
        name: "Floor 2",
        rooms: {
            "MCA Computer Lab": { x: 320, y: 288, floor: 2 },
            "Examination Evaluation Center-2": { x: 1076, y: 285, floor: 2 },
            "Skill Lab": { x: 268, y: 498, floor: 2 },
            "MCA Staff Room": { x: 263, y: 1031, floor: 2 },
            "MCA Classroom (Bottom-Left)": { x: 574, y: 1077, floor: 2 },
            "MCA Library": { x: 917, y: 1080, floor: 2 },
            "MCA Classroom (Upper-Right)": { x: 1119, y: 545, floor: 2 },
            "MCA Classroom (Lower-Right)": { x: 1123, y: 770, floor: 2 },
        }
    },
    3: {
        name: "Floor 3",
        rooms: {
            "AB 501": { x: 706, y: 1079, floor: 3 },
            "AB 502": { x: 414, y: 1076, floor: 3 },
            "AB503": { x: 264, y: 1101, floor: 3 },
            "AB 504": { x: 268, y: 769, floor: 3 },
            "AB 505": { x: 265, y: 313, floor: 3 },
            "AB 506": { x: 266, y: 233, floor: 3 },
            "AB 507": { x: 308, y: 194, floor: 3 },
            "AB 508": { x: 356, y: 241, floor: 3 },
            "AB 510": { x: 1037, y: 254, floor: 3 },
            "AB511": { x: 1069, y: 220, floor: 3 },
            "AB 512": { x: 1195, y: 252, floor: 3 },
            "AB 514": { x: 1119, y: 549, floor: 3 },
            "AB 515": { x: 1122, y: 765, floor: 3 },
            "AB 516": { x: 1313, y: 1205, floor: 3 },
        }
    },
    4: {
        name: "Floor 4",
        rooms: {
            "Physics Lab (Large)": { x: 316, y: 288, floor: 4 },
            "Physics Lab (Small)": { x: 267, y: 317, floor: 4 },
            "BOARD ROOM": { x: 1311, y: 1213, floor: 4 },
            "AB 601": { x: 701, y: 1078, floor: 4 },
            "AB 602": { x: 416, y: 1084, floor: 4 },
            "AB 603": { x: 265, y: 1106, floor: 4 },
            "AB 604": { x: 266, y: 774, floor: 4 },
            "AB 608": { x: 1072, y: 286, floor: 4 },
            "AB 610": { x: 1120, y: 551, floor: 4 },
            "AB 611": { x: 1121, y: 764, floor: 4 },
        }
    },
    5: {
        name: "Floor 5",
        rooms: {
            "Computer Lab 1": { x: 310, y: 1080, floor: 5 },
            "Computer Lab 2": { x: 267, y: 331, floor: 5 },
            "Department of Humanities": { x: 330, y: 285, floor: 5 },
            "Staff Library": { x: 1038, y: 257, floor: 5 },
            "Staff Meeting Room": { x: 1086, y: 133, floor: 5 },
            "Math Dept. Staff Room 1": { x: 268, y: 399, floor: 5 },
            "Math Dept. Staff Room 2": { x: 1126, y: 253, floor: 5 },
            "Department of Mathematics": { x: 1121, y: 762, floor: 5 },
            "AB 701": { x: 716, y: 1080, floor: 5 },
            "AB 702": { x: 412, y: 1080, floor: 5 },
            "Apex Library": { x: 1308, y: 1206, floor: 5 },
        }
    },

    stairs: [
        { x: 1094, y: 1270, floors: [1, 2, 3, 4, 5], name: "Main Staircase" },
    ],
    elevators: [
        { x: 1053, y: 1138, floors: [1, 2, 3, 4, 5], name: "Elevator 1" },
        { x: 1197, y: 894, floors: [1, 2, 3, 4, 5], name: "Elevator 2" },
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
 * Get all rooms as object with floor info (includes stairs & elevators)
 */
function getAllRooms() {
    const allRooms = {};
    for (let floor = 1; floor <= 5; floor++) {
        if (BUILDING_DATA[floor] && BUILDING_DATA[floor].rooms) {
            Object.assign(allRooms, BUILDING_DATA[floor].rooms);
        }
    }

    // Add stairs and elevators so they exist in the graph and getRoom can find them
    if (BUILDING_DATA.stairs) {
        BUILDING_DATA.stairs.forEach(stair => {
            allRooms[stair.name] = { x: stair.x, y: stair.y, floors: stair.floors, isStair: true };
        });
    }
    if (BUILDING_DATA.elevators) {
        BUILDING_DATA.elevators.forEach((elev, idx) => {
            const name = elev.name || `Elevator ${idx + 1}`;
            allRooms[name] = { x: elev.x, y: elev.y, floors: elev.floors, isElevator: true };
        });
    }

    return allRooms;
}

/**
 * Get a specific room by name
 */
function getRoom(roomName) {
    return getAllRooms()[roomName] || null;
}

/**
 * Get all rooms on a specific floor (includes stairs & elevators)
 */
function getRoomsByFloor(floor) {
    const rooms = {};
    if (BUILDING_DATA[floor] && BUILDING_DATA[floor].rooms) {
        Object.assign(rooms, BUILDING_DATA[floor].rooms);
    }
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
 * Euclidean distance between two room objects {x, y}
 */
function getDistance(room1, room2) {
    if (!room1 || !room2) return Infinity;
    const dx = room1.x - room2.x;
    const dy = room1.y - room2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/** Get all staircases */
function getStairs() { return BUILDING_DATA.stairs || []; }

/** Get all elevators */
function getElevators() { return BUILDING_DATA.elevators || []; }

/** Check if two rooms are on the same floor */
function onSameFloor(room1Name, room2Name) {
    const r1 = getRoom(room1Name);
    const r2 = getRoom(room2Name);
    return r1 && r2 && r1.floor === r2.floor;
}

/**
 * Max pixel distance between rooms to consider them connected on the same floor.
 * Images are 1600×1515, so 1500 covers the full diagonal.
 */
function getConnectivityThreshold() { return 1500; }

console.log('🏢 Building data loaded successfully');
console.log(`📊 Total rooms: ${Object.keys(getAllRooms()).length}`);
console.log(`🔢 Floors: ${Object.keys(BUILDING_DATA).filter(k => !isNaN(k)).length}`);