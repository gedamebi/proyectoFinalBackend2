
const goToCart = () => {
    window.location.href = `/carts/${localStorage.getItem('cartUser')}`;
}

const volver = () => {
    window.location.href = '../userDashboard'
}

const delProdToCarts = async (idProduct) => {
    const result = await Swal.fire({
        title: "Usted esta seguro?",
        text: "Eliminar el producto del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    });
    
    if (result.isConfirmed) {

        const response = await fetch(`/api/carts/${localStorage.getItem('cartUser')}/product/${idProduct}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : localStorage.getItem('authToken')
            }
        });

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al eliminar producto del carrito!',
                footer: '<a href="">Consultar al administrador!</a>'
            })
            throw new Error('Error al eliminar producto del carrito');
        }

        const data = await response.json();

        await Swal.fire({
            title: "Eliminado!",
            text: "Producto eliminado correctamente",
            icon: "success"
        });

        window.location.reload()
    }
};


const purchase = async () => {
    const result = await Swal.fire({
        title: "Usted esta seguro?",
        text: "Confirmar compra",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, confirmar!"
    });
    
    if (result.isConfirmed) {

        const response = await fetch(`/api/carts/${localStorage.getItem('cartUser')}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : localStorage.getItem('authToken')
            }
        });

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al confirmar la compra!',
                footer: '<a href="">Consultar al administrador!</a>'
            })
            throw new Error('Error al eliminar producto del carrito');
        }

        const data = await response.json();
        if (data.productsPurchased.length == 0){
            await Swal.fire({
                title: "Aviso!",
                text: "No hay stock de ningun producto",
                icon: "warning"
            });
        }

        if (data.productsPurchased.length > 0 && data.productsOutOfStock.length > 0){
            await Swal.fire({
                title: "Confirmado!",
                text: "Compra finalizada pero con algunos productos sin stock",
                icon: "warning"
            });
        } 

        if (data.productsPurchased.length > 0 && data.productsOutOfStock.length == 0){
            await Swal.fire({
                title: "Confirmado!",
                text: "Compra finalizada correctamente",
                icon: "success"
            });
        } 
        
        window.location.href = `/carts/${localStorage.getItem('cartUser')}`;
    }
}