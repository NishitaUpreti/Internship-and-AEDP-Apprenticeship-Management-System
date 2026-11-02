require("dotenv").config();
const { getDemoConnection, closeDemoConnection, getDemoDatabaseUri } = require("../config/demoDatabase");
const { getDemoStudentModel } = require("../models/demo/DemoStudent");

const BRANCHES = [
    "Computer Science",
    "Information Technology",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering"
];

// Curated seed dataset with diverse fictional student profiles
const FIRST_NAMES = [
    "Aarav", "Aditi", "Advait", "Ananya", "Aryan", "Bhavya", "Chirag", "Deepika",
    "Dev", "Diya", "Dhruv", "Gaurav", "Isha", "Ishaan", "Kabir", "Kavya",
    "Kunal", "Meera", "Mihir", "Nandini", "Neha", "Nikhil", "Pooja", "Pranav",
    "Priya", "Rahul", "Rhea", "Rohan", "Saanvi", "Samarth", "Sanya", "Shaurya",
    "Shreya", "Siddharth", "Simran", "Sneha", "Tanvi", "Tarun", "Utkarsh", "Varun",
    "Vedika", "Vihaan", "Vikram", "Yash", "Zara", "Aakash", "Anika", "Harsh",
    "Kriti", "Manav", "Palak", "Rishabh", "Ritu", "Sahil", "Tanya", "Vivek",
    "Akanksha", "Alok", "Charu", "Himanshu", "Lavanya", "Mayank"
];

const LAST_NAMES = [
    "Sharma", "Verma", "Patel", "Nair", "Reddy", "Iyer", "Rao", "Gupta",
    "Malhotra", "Kapoor", "Bhatia", "Joshi", "Chopra", "Mehta", "Singh", "Das",
    "Kulkarni", "Deshmukh", "Choudhury", "Bose", "Saxena", "Menon", "Agarwal", "Mishra"
];

function generateDemoCode(regNo) {
    const num = parseInt(regNo, 10);
    return String((num * 73 + 104729) % 900000 + 100000);
}

function generateDemoStudents() {
    const students = [];
    const usedRegNos = new Set();

    // Specific well-known demo accounts for consistent showcase
    const showcaseStudents = [
        {
            regSuffix: "29384",
            fullName: "Aarav Sharma",
            branch: "Computer Science",
            semester: 6,
            cgpa: 9.15,
            academicStatus: "ACTIVE",
            admissionYear: 2023
        },
        {
            regSuffix: "64385",
            fullName: "Priya Patel",
            branch: "Information Technology",
            semester: 4,
            cgpa: 8.64,
            academicStatus: "ACTIVE",
            admissionYear: 2024
        },
        {
            regSuffix: "81726",
            fullName: "Rohan Verma",
            branch: "Electronics and Communication",
            semester: 8,
            cgpa: 7.92,
            academicStatus: "ACTIVE",
            admissionYear: 2022
        },
        {
            regSuffix: "39251",
            fullName: "Sneha Nair",
            branch: "Mechanical Engineering",
            semester: 6,
            cgpa: 8.35,
            academicStatus: "ACTIVE",
            admissionYear: 2023
        },
        {
            regSuffix: "73519",
            fullName: "Vikram Singh",
            branch: "Civil Engineering",
            semester: 5,
            cgpa: 7.48,
            academicStatus: "ACTIVE",
            admissionYear: 2023
        },
        {
            regSuffix: "99001",
            fullName: "Inactive Student Demo",
            branch: "Computer Science",
            semester: 3,
            cgpa: 6.20,
            academicStatus: "INACTIVE",
            admissionYear: 2024
        },
        {
            regSuffix: "99002",
            fullName: "Graduated Alumnus Demo",
            branch: "Information Technology",
            semester: 8,
            cgpa: 8.90,
            academicStatus: "GRADUATED",
            admissionYear: 2021
        }
    ];

    showcaseStudents.forEach(s => {
        const regNo = `124${s.regSuffix}`;
        usedRegNos.add(regNo);
        const email = s.fullName.toLowerCase().replace(/\s+/g, ".") + "@example.com";
        students.push({
            registrationNumber: regNo,
            fullName: s.fullName,
            email,
            branch: s.branch,
            semester: s.semester,
            cgpa: s.cgpa,
            academicStatus: s.academicStatus,
            admissionYear: s.admissionYear,
            demoVerificationCode: generateDemoCode(regNo),
            isDemo: true,
            dataSource: "SIMULATED"
        });
    });

    // Generate up to 60 total fictional student records
    let nameIdx = 0;
    let baseNumber = 10001;

    while (students.length < 60) {
        const regNo = `124${String(baseNumber).padStart(5, "0")}`;
        baseNumber++;

        if (usedRegNos.has(regNo)) continue;
        usedRegNos.add(regNo);

        const firstName = FIRST_NAMES[nameIdx % FIRST_NAMES.length];
        const lastName = LAST_NAMES[nameIdx % LAST_NAMES.length];
        nameIdx++;

        const fullName = `${firstName} ${lastName}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${students.length}@example.com`;
        const branch = BRANCHES[students.length % BRANCHES.length];
        const semester = (students.length % 8) + 1;
        // CGPA between 5.50 and 9.85 rounded to 2 decimals
        const cgpa = Number((5.5 + ((students.length * 7) % 43) * 0.1).toFixed(2));
        const admissionYear = 2026 - Math.ceil(semester / 2);

        students.push({
            registrationNumber: regNo,
            fullName,
            email,
            branch,
            semester,
            cgpa,
            academicStatus: "ACTIVE",
            admissionYear,
            demoVerificationCode: generateDemoCode(regNo),
            isDemo: true,
            dataSource: "SIMULATED"
        });
    }

    return students;
}

async function seedDemoStudents(targetUri) {
    console.log("============================================================");
    console.log(" SEEDING SIMULATED UNIVERSITY STUDENT DATABASE (DEMO ONLY)  ");
    console.log("============================================================\n");

    const isTest = process.env.NODE_ENV === "test";
    const uri = targetUri || getDemoDatabaseUri(isTest);

    // Mask URI for safe output
    let masked = "mongodb+srv://***:***@...";
    try {
        const u = new URL(uri);
        masked = `${u.protocol}//${u.username ? u.username.slice(0, 2) + "***" : "***"}:****@${u.hostname}${u.pathname}`;
    } catch {}

    console.log(`Connecting to demo database: ${masked}`);
    const connection = await getDemoConnection(uri);
    const DemoStudent = getDemoStudentModel(connection);

    // Sync indexes to ensure unique constraint on registrationNumber
    await DemoStudent.syncIndexes();
    console.log("✓ Synchronized schema indexes on 'students' collection.");

    const students = generateDemoStudents();
    console.log(`Prepared ${students.length} simulated student records for seeding.`);

    // Validate registration numbers against /^124\d{5}$/
    const regPattern = /^124\d{5}$/;
    for (const student of students) {
        if (!regPattern.test(student.registrationNumber)) {
            throw new Error(`Invalid registration number format generated: ${student.registrationNumber}`);
        }
    }
    console.log("✓ Verified all registration numbers strictly adhere to /^124\\d{5}$/ format.");

    // Idempotent bulk upsert operations
    const operations = students.map(student => ({
        updateOne: {
            filter: { registrationNumber: student.registrationNumber },
            update: { $set: student },
            upsert: true
        }
    }));

    const result = await DemoStudent.bulkWrite(operations);
    console.log(`✓ Bulk upsert completed:`);
    console.log(`   - Matched: ${result.matchedCount}`);
    console.log(`   - Modified: ${result.modifiedCount}`);
    console.log(`   - Upserted: ${result.upsertedCount}`);

    const totalCount = await DemoStudent.countDocuments();
    console.log(`✓ Total simulated students in 'university_demo.students': ${totalCount}\n`);

    console.log("============================================================");
    console.log(" SEED COMPLETED SUCCESSFULLY (DEMO SIMULATION ONLY)         ");
    console.log("============================================================");

    return { totalCount, matched: result.matchedCount, upserted: result.upsertedCount };
}

// Direct execution from command line
if (require.main === module) {
    seedDemoStudents()
        .then(async () => {
            await closeDemoConnection();
            process.exit(0);
        })
        .catch(async (err) => {
            console.error("❌ Seeding failed:", err.message);
            await closeDemoConnection();
            process.exit(1);
        });
}

module.exports = {
    seedDemoStudents,
    generateDemoStudents
};
