
const loginForm = document.getElementById('login-form');
if (loginForm) {
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/api/sessions/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error de login!'
                })
                throw new Error('Error en la autenticación');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);

            const responseCurrent = await fetch('http://localhost:8080/api/sessions/current/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : data.token
                }
            });
            const currentUser = await responseCurrent.json();
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            if (currentUser.rol.toUpperCase() == 'USER'){
                const responseCart = await fetch(`http://localhost:8080/api/carts/user/${currentUser.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : data.token
                    }
                });
                const cartUser = await responseCart.json();
                const user = currentUser.email
                if (cartUser.cartFinded === null) {
                    const responseCreateCart = await fetch(`http://localhost:8080/api/carts/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization" : data.token
                        },
                        body: JSON.stringify({ user }),
                    });
                    const newCart = await responseCreateCart.json();
                    localStorage.setItem('cartUser', newCart.cart._id);
                } else {
                    localStorage.setItem('cartUser', cartUser.cartFinded._id);
                }
            }
            switch (currentUser.rol.toUpperCase()){
                case 'USER':
                        window.location.href = './userDashboard'
                    break
                case 'ADMIN':
                        await Swal.fire({
                            title: "Aviso!",
                            text: "Sos admin, aun no tengo vista para vos. pero te vas a encargar de manejar productos",
                            icon: "warning"
                        });
                    break
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}



const registerForm = document.getElementById('register-form');
if (registerForm) {
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const edad = document.getElementById('edad').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/api/sessions/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido, email, edad, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message
                })
                throw new Error('Error en el registro');
            }
            
            if (response.ok) {
                await Swal.fire({
                    title: "Registro!",
                    text: "Usuario registrado correctamente",
                    icon: "success"
                });
                window.location.href = './'
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}



const logout = async () => {
    const response = await fetch('http://localhost:8080/api/sessions/logout/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('cartUser');
        localStorage.removeItem('currentUser');
        window.location.href = './'
    }
}