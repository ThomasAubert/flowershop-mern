import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import  {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import {listProductDetails} from '../actions/productActions.js';
import {Row, Col, Image, ListGroup, Card, Button,} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductPage = ({match}) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state)=> state.productDetails);
  const {loading, error, product} = productDetails;
  useEffect(()=> {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch]);
  
  return (
    <>
      <Link to="/" className='btn btn-outline-dark my-3'>
        Home Page
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
      {/* FIRST COLUMN */}
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid/> 
        </Col>
      {/* SECOND COLUMN */}
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p className="lead">{product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating 
                value={product.rating} 
                text={`${product.numReviews} ratings`}                   
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>£{product.price}</h3>
            </ListGroup.Item>
          </ListGroup>  
        </Col>
      {/* THIRD COLUMN */}
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>                
                <Row>
                  <Col>
                    Price: 
                  </Col>
                  <Col>
                    {product.price}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Status: 
                  </Col>
                  <Col>
                    {product.counInStock > 0
                      ? 'In Stock' 
                      : 'Out of Stock'
                    }
                  </Col>            
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button 
                  className="btn-warning btn-block" 
                  type="button"
                  disabled={product.counInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
      
    </>
  )
}

export default ProductPage;
