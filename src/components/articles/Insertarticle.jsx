import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchscategories } from '../../service/scategorieservice';
import axios from "axios"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview)

const Insertarticle = ({ addproduct }) => {
  const [show, setShow] = useState(false);
  const [article, setArticle] = useState({});
  const [files, setFiles] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [scategories, setScategories] = useState([])
  useEffect(() => {
    getscategories()
  }, [])
  const getscategories = async () => {
    try {
      await fetchscategories().then(res =>
        setScategories(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      addproduct(article)
      handleReset()
      setValidated(false);
    }
    setValidated(true)
  }

  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }
  const serverOptions = () => {
    console.log('server pond');
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file)
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'EcommerceReact');
        data.append('cloud_name', 'dolz4mll1');
        data.append('public_id', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dolz4mll1/upload', data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };


  return (

    <>
      <Button variant="primary" onClick={handleShow}>
        New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add article</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container w-100 d-flex justify-content-center" >
            <div>


              <div className='form mt-3'>
                <Form className="border p-3" >
                  <Row className="mb-2">
                    <Form.Group as={Col} md="6" >
                      <Form.Label >Reference *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name='reference'
                        placeholder="Reference"
                        value={article.reference}
                        onChange={(e) => onInputChange(e)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Designation *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name='designation'
                        placeholder="Designation"
                        value={article.designation}
                        onChange={(e) => onInputChange(e)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group className="col-md-6">
                      <Form.Label>Marque *</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        name='marque'
                        placeholder="Marque"
                        value={article.marque}
                        onChange={(e) => onInputChange(e)}
                      />

                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Prix"
                        name='prix'
                        value={article.prix}
                        onChange={(e) => onInputChange(e)}
                      />

                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="col-md-6 ">
                      <Form.Label>
                        Quantity stock<span className="req-tag">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name='qtestock'
                        type="number"
                        value={article.qtestock}
                        onChange={(e) => onInputChange(e)}
                        placeholder="Qté stock"
                      />

                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        type="select"
                        value={article.scategorieID}
                        name='scategorieID'
                        onChange={(e) => onInputChange(e)}
                      >
                        <option>Choose a sub-category</option>
                        {scategories.map((scat, index) =>
                          <option value={scat._id}>{scat.nomscategorie}</option>
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Row>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond

                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      server={serverOptions()}
                      name="file"

                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e => handleSubmit(e))}><i class="fa-solid fa-floppy-disk"></i> Save</Button>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Insertarticle