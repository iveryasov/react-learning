import { useState, useEffect } from "react";

// Day 147
// Shopping list with local storage

interface Product {
    name: string;
    id: number;
}

const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (err) {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (err) {
            console.warn(err);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

const Day147 = () => {
    const [products, setProducts] = useLocalStorage<Product[]>("products", []);
    const [product, setProduct] = useState<string>("");

    // Add function
    const addProduct = (p: string) => {
        const filteredProduct = p.trim();

        if (filteredProduct.length === 0) {
            alert("Type product name in input");
            return;
        }

        const productIds = products.map(p => p.id);

        const id = products.length === 0 ? 1 : Math.max(...productIds) + 1;

        const productObject: Product = {
            name: filteredProduct,
            id: id
        }

        setProducts([...products, productObject]);
        setProduct("");
    }

    // Delete function
    const deleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div>
            <h1>Shopping list</h1>

            <section>
                <input 
                    type="text"
                    placeholder="Product name..."
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                />
                <button onClick={() => addProduct(product)}>
                    Add
                </button>
            </section>

            <section>
                {products.length === 0 ? (
                    <div>
                        <p>The list is empty</p>
                    </div>
                ) : (
                    <div>
                        {products.map(product =>
                            <div key={product.id}>
                                <h3>{product.name}</h3>
                                <button onClick={() => deleteProduct(product.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <p>Products: {products.length}</p>
                <button onClick={() => setProducts([])}>
                    Clear list
                </button>
            </section>
        </div>
    )
};

export default Day147;