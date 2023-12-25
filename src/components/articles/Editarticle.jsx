import React, { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { fetchscategories } from "../../service/scategorieservice"
import { useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview)

const Editarticle = ({ show, handleClose, art, updateProduct }) => {

  const [article, setArticle] = useState(art)
  const [files, setFiles] = useState([]);

  const [scategories, setScategories] = useState([])
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getScategories()
    setFiles([
      {
        source: art.imageart,
        options: { type: 'local' }
      }
    ])
  }, [])
  const getScategories = async () => {
    await fetchscategories().then(res => {
      setScategories(res.data)
    })
  }
  const handlechange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      updateProduct(article)
      handleReset()
      setValidated(false);
    }
    setValidated(true)

  }


  const handleReset = () => {
    setArticle({})
    setFiles([])
    handleClose()
  }
  const serverOptions = () => {
    console.log('server pond');
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
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
    <div>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} >
          <Modal.Header closeButton>
            <h2>Edit a product</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="container w-100 d-flex justify-content-center">
              <div>
                <div className='form mt-3'>
                  <Row className="mb-2">
                    <Form.Group as={Col} md="6" >
                      <Form.Label >Reference *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Reference"
                        name="reference"
                        value={article.reference}
                        onChange={(e) => handlechange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Type article reference
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Designation *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={article.designation}
                        onChange={(e) => handlechange(e)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Saisir Désignation
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group className="col-md-6">
                      <Form.Label>Marque *</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          required
                          name="marque"
                          placeholder="Marque"
                          value={article.marque}
                          onChange={(e) => handlechange(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Marque Incorrecte
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Price"
                        name="prix"
                        value={article.prix}
                        onChange={(e) => handlechange(e)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="col-md-6 ">
                      <Form.Label>
                        Quantity<span className="req-tag">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="qtestock"
                        value={article.qtestock}
                        onChange={(e) => handlechange(e)}
                        placeholder="Quantity"
                      />
                      <Form.Control.Feedback type="invalid">
                        Qté stock Incorrect
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Sub-category</Form.Label>
                      <Form.Control
                        as="select"
                        type="select"
                        name="scategorieID"
                        value={article.scategorieID}
                        onChange={(e) => handlechange(e)}
                      >
                        <option></option>
                        {scategories.map((scat) => <option key={scat._id}
                          value={scat._id}>{scat.nomscategorie}</option>
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Row>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond

                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={true}
                      server={serverOptions()}
                      name="file"

                    />
                  </div>

                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={(e => handleSubmit(e))}><i class="fa-solid fa-floppy-disk"></i> Save</Button>
            <Button type="button" className="btn btn-warning"
              onClick={() => handleReset()}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}


export default Editarticle