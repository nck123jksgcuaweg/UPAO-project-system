
        function showForm(formType) {
            // Update tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');

            // Update forms
            const forms = document.querySelectorAll('.form-content');
            forms.forEach(form => form.classList.remove('active'));
            
            if (formType === 'login') {
                document.getElementById('login-form').classList.add('active');
            } else {
                document.getElementById('register-form').classList.add('active');
            }

            // Clear messages
            document.querySelectorAll('.message').forEach(msg => {
                msg.style.display = 'none';
            });
        }

        async function handleLogin(event) {
            event.preventDefault();
            
            const loginId = document.getElementById('login-id').value;
            const password = document.getElementById('login-password').value;
            const messageEl = document.getElementById('login-message');
            const btn = event.target.querySelector('.btn');

            // Disable button during request
            btn.disabled = true;
            btn.textContent = 'LOGGING IN...';

            try {
                const formData = new FormData();
                formData.append('loginId', loginId);
                formData.append('password', password);

                const response = await fetch('login.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    messageEl.textContent = data.message;
                    messageEl.className = 'message success';
                    messageEl.style.display = 'block';
                    event.target.reset();
                } else {
                    messageEl.textContent = data.message;
                    messageEl.className = 'message error';
                    messageEl.style.display = 'block';
                }
            } catch (error) {
                console.log("[v0] Login error:", error);
                messageEl.textContent = 'An error occurred. Please try again.';
                messageEl.className = 'message error';
                messageEl.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.textContent = 'LOGIN';
            }
        }

        async function handleRegister(event) {
            event.preventDefault();
            
            console.log("[v0] Registration form submitted");
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageEl = document.getElementById('register-message');
            const btn = event.target.querySelector('.btn');

            // Password validation
            if (password !== confirmPassword) {
                messageEl.textContent = 'Passwords do not match!';
                messageEl.className = 'message error';
                messageEl.style.display = 'block';
                return;
            }

            if (password.length < 6) {
                messageEl.textContent = 'Password must be at least 6 characters.';
                messageEl.className = 'message error';
                messageEl.style.display = 'block';
                return;
            }

            const artCategories = document.querySelectorAll('input[name="artCategory"]:checked');
            console.log("[v0] Art categories selected:", artCategories.length);

            // Disable button during request
            btn.disabled = true;
            btn.textContent = 'SUBMITTING...';

            try {
                const formData = new FormData();
                
                formData.append('lastName', document.getElementById('lastName').value);
                formData.append('firstName', document.getElementById('firstName').value);
                formData.append('middleName', document.getElementById('middleName').value);
                formData.append('studentId', document.getElementById('studentId').value);
                formData.append('birthdate', document.getElementById('birthdate').value);
                formData.append('sex', document.querySelector('input[name="sex"]:checked')?.value || '');
                formData.append('nationality', document.getElementById('nationality').value);
                formData.append('religion', document.getElementById('religion').value);
                formData.append('civilStatus', document.getElementById('civilStatus').value);
                formData.append('bloodType', document.getElementById('bloodType').value);
                formData.append('mobile', document.getElementById('mobile').value);
                formData.append('email', document.getElementById('email').value);
                formData.append('homeAddress', document.getElementById('homeAddress').value);
                formData.append('campusAddress', document.getElementById('campusAddress').value);
                formData.append('specify', document.getElementById('specify').value);
                formData.append('memberType', document.querySelector('input[name="memberType"]:checked')?.value || '');
                formData.append('password', password);
                formData.append('confirmPassword', confirmPassword);
                
                // Add art categories
                artCategories.forEach(cat => formData.append('artCategory[]', cat.value));

                console.log("[v0] Sending data to register.php");

                const response = await fetch('register.php', {
                    method: 'POST',
                    body: formData
                });

                console.log("[v0] Response status:", response.status);
                console.log("[v0] Response ok:", response.ok);
                
                const contentType = response.headers.get("content-type");
                console.log("[v0] Response content-type:", contentType);
                
                const responseText = await response.text();
                console.log("[v0] Raw response:", responseText);
                
                if (!contentType || !contentType.includes("application/json")) {
                    console.error("[v0] Server did not return JSON");
                    messageEl.textContent = 'Connection error: Server returned non-JSON response. Please check if PHP server is running.';
                    messageEl.className = 'message error';
                    messageEl.style.display = 'block';
                    return;
                }

                const data = JSON.parse(responseText);
                console.log("[v0] Parsed data:", data);

                if (data.success) {
                    messageEl.textContent = data.message;
                    messageEl.className = 'message success';
                    messageEl.style.display = 'block';
                    event.target.reset();
                    
                    // Switch to login after delay
                    setTimeout(() => {
                        document.querySelector('.tab:first-child').click();
                    }, 3000);
                } else {
                    messageEl.textContent = data.message;
                    messageEl.className = 'message error';
                    messageEl.style.display = 'block';
                }
            } catch (error) {
                console.error("[v0] Registration error:", error);
                messageEl.textContent = 'Error: ' + error.message + '. Make sure your PHP server is running (use XAMPP, WAMP, or php -S localhost:8000)';
                messageEl.className = 'message error';
                messageEl.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.textContent = 'SUBMIT REGISTRATION';
            }
        }

        window.addEventListener('DOMContentLoaded', async () => {
            console.log("[v0] Testing PHP connection...");
            try {
                const response = await fetch('test_connection.php');
                const data = await response.json();
                if (data.success) {
                    console.log("[v0] PHP server is running:", data.message);
                } else {
                    console.error("[v0] PHP test failed");
                }
            } catch (error) {
                console.error("[v0] PHP server is NOT running. Please start your PHP server:", error.message);
                console.error("[v0] To start PHP server, run: php -S localhost:8000");
            }
        });
  