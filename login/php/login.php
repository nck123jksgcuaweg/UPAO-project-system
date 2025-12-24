<?php
session_start();
require_once 'db.php';

// Set response header to JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginId = $_POST['loginId'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Validation
    if (empty($loginId) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
        exit;
    }
    
    // Connect to database
    $conn = getConnection();
    
    // Check if login ID is student ID or email
    $stmt = $conn->prepare("SELECT id, student_id, first_name, last_name, email, password FROM upao.members WHERE student_id = ? OR email = ?");
    $stmt->bind_param("ss", $loginId, $loginId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['student_id'] = $user['student_id'];
            $_SESSION['name'] = $user['first_name'] . ' ' . $user['last_name'];
            $_SESSION['email'] = $user['email'];
            
            echo json_encode([
                'success' => true, 
                'message' => 'Login successful! Welcome to UPAO Cultural Arts Group.',
                'user' => [
                    'name' => $_SESSION['name'],
                    'student_id' => $user['student_id']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
    }
    
    $stmt->close();
    closeConnection($conn);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
