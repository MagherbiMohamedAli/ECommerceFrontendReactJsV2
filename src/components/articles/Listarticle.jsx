import React, { useEffect, useState } from 'react'
import { fetcharticles, deletearticle, addarticle, updatearticle } from "../../service/articleservice"
import Affichearticlestable from './Affichearticlestable'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Insertarticle from './Insertarticle';
import ReactLoading from 'react-loading';

const Listarticle = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsloading]=useState(true)

    useEffect(() => {
        listproduits()
    }, [])
    const listproduits = async () => {
        try {
            await fetcharticles().then(res =>{
                setProducts(res.data)
                setIsloading(false)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    const addproduct = (newproduit) => {
        addarticle(newproduit).then(res => {
            setProducts([res.data, ...products])
        })
    }
    const deleteProduct = (productId, designation) => {
        confirmAlert({
            title: "Confirm delete...",
            message: "Delete article :" + designation,
            buttons: [
                {
                    label: 'yes',
                    onClick: () => deletearticle(productId)
                        .then(res =>
                            setProducts(products.filter((product) => product._id !==
                                productId)))
                        .catch(error => console.log(error))
                },
                {
                    label: 'No',
                }
            ]
        });

    }

    const updateProduct = (prmod) => {
        updatearticle(prmod).then(res=>{
        setProducts(products.map((product) => product._id === prmod._id ? prmod : product));
        })
    };
    if(isLoading) return <center><ReactLoading type='spokes' color='blue' height={'4%'} width={"4%"}/></center>
    return (
        <div>
            <Insertarticle addproduct={addproduct} />
            <Affichearticlestable products={products} deleteProduct={deleteProduct} updateProduct={updateProduct} />
        </div>
    )
}

export default Listarticle