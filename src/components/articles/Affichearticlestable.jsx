import React ,{ useState}from 'react'
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import Button from 'react-bootstrap/Button';

import { Box } from '@mui/material';
import Editarticle from './Editarticle';

const Affichearticlestable = ({ products, deleteProduct,updateProduct }) => {
    const [show, setShow] = useState("");
    const [art, setArt] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const modifArt = (value) => {
        handleShow()
        setArt(value)
    }
    const columns = useMemo(
        () => [
            {

                accessorKey: 'imageart',
                header: 'Image',
                Cell: ({ cell }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',



                        }}
                    >
                        <img
                            alt=""
                            height={100}
                            src={cell.getValue()}
                            loading="lazy"
                            style={{ borderRadius: '20%' }}
                        />

                    </Box>),

            },
            {
                accessorKey: 'reference',
                header: 'Reference',
                size: 150,
            },
            {
                accessorKey: 'designation',
                header: 'Designation',
                size: 200,
            },
            {
                accessorKey: 'prix',
                header: 'Price',
                size: 150,
            },
            {
                accessorKey: 'qtestock',
                header: 'Quantity',
                size: 150,
            },
            {
                accessorKey: '_id',
                header: 'actions',
                size: 100,
                Cell: ({ cell, row }) => (
                    <div >
                        <Button
                            variant="warning"
                            size="md"
                            style={{ float: 'left' }}
                            className="text-warning btn-link edit"
                            onClick={() => { modifArt(cell.row.original) }}>

                            <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                        <Button
                            onClick={(e) => {
                                deleteProduct(cell.row.original._id, cell.row.original.reference, e);
                            }}
                            variant="danger"
                            size="md"
                            className="text-danger btn-link delete"
                        >
                            <i className="fa fa-trash" />



                        </Button>
                    </div>
                ),
            }
        ],
        [products],
    );

    const table = useMaterialReactTable({
        columns,
        data: products,
    });


    return (
        <div>
            {show && <Editarticle
                show={show}
                handleClose={handleClose}
                art={art}
                updateProduct={updateProduct}
            />
            }
            <MaterialReactTable table={table} />
        </div>
    )

}
export default Affichearticlestable