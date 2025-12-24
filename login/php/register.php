<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$db = 'upao';
$user = 'root';
$pass = ''; // change if needed

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receive POST data safely
    $studentId = $_POST['studentId'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $firstName = $_POST['firstName'] ?? '';
    $middleName = $_POST['middleName'] ?? '';
    $birthdate = $_POST['birthdate'] ?? '';
    $sex = $_POST['sex'] ?? '';
    $nationality = $_POST['nationality'] ?? '';
    $religion = $_POST['religion'] ?? '';
    $civilStatus = $_POST['civilStatus'] ?? '';
    $bloodType = $_POST['bloodType'] ?? '';
    $mobile = $_POST['mobile'] ?? '';
    $email = $_POST['email'] ?? '';
    $homeAddress = $_POST['homeAddress'] ?? '';
    $campusAddress = $_POST['campusAddress'] ?? '';
    $password = $_POST['password'] ?? '';
    $memberType = $_POST['memberType'] ?? '';
    $specify = $_POST['specify'] ?? '';

    // Combine checkboxes
    $artCategory = '';
    if (!empty($_POST['artCategory']) && is_array($_POST['artCategory'])) {
        $artCategory = implode(',', $_POST['artCategory']);
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO upao.members (student_id, last_name, first_name, middle_name, birthdate, sex, nationality, religion, civil_status, blood_type, mobile, email, home_address, campus_address, password, member_type, art_category, specify) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssssssssss", $studentId, $lastName, $firstName, $middleName, $birthdate, $sex, $nationality, $religion, $civilStatus, $bloodType, $mobile, $email, $homeAddress, $campusAddress, $hashedPassword, $memberType, $artCategory, $specify);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
