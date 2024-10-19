
let sortSelect = document.getElementById("optionOrden")

sortSelect.addEventListener("change", ()=>{

    if(sortSelect.value == "1"){
        window.location = `?sort=dsc`;
    }else if(sortSelect.value =="2"){
        window.location = `?sort=asc`;
    }else{
        window.location = `?sort=asc`;
    }
})

const addProduct = async (idProduct) => {
	let dataProduct = await fetch(`/api/products/${idProduct}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(res => res.ok ? res.json() : Promise.reject(res))
		.then(data => {
			return data.data
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Producto no encontrado!',
				footer: '<a href="">Consultar al administrador!</a>'
			})
		})

	await fetch(`/api/carts/66ea0d60303df6631be27aea/product/${idProduct}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(res => res.ok ? res.json() : Promise.reject(res))
		.then(data => {
			if (data.error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Error al agregar producto!',
					footer: '<a href="">Consultar al vendedor!</a>'
				})
			}
			Swal.fire({
				icon: 'success',
				title: 'Se agrego al carrito!',
				showConfirmButton: false,
				timer: 1500
			})
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `Error ${JSON.stringify(error)}`,
				footer: '<a href="">Consultar al administrador!</a>'
			})

		})
}