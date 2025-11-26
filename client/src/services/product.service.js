export const productService = {
    getAll: async () => {
        try{
            const response = await fetch("https://68e441c38e116898997b631d.mockapi.io/api/Food");
            if (response.ok) {
                const result = await response.json();
                return result;
            }
        }catch(error) {
            console.log(error);
        }
    },
    get: async (id, uid) => {
        try{
            const response = await fetch(`https://68e441c38e116898997b631d.mockapi.io/api/User/${uid}/Food/${id}`);
            if (response.ok) {
                const result = await response.json();
                return result
            }
        }catch(error) {
            console.log(error);
        }
    },
    create: async (product) => {
        try{
            const response = await fetch(`https://68e441c38e116898997b631d.mockapi.io/api/User/${product.uid}/Food`, {
                method: "POST",
                body: {
                    product: product.title,
                    price: product.price,
                    description: product.description
                }
            });
            if (response.ok) {
                const result = await response.json();
                return result
            }
        }catch(error) {
            console.log(error);
        }
    }
}