import React from 'react';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import {products} from '../products';

import {Row, Col, Image, ListGroup, Card, Button,} from 'react-bootstrap';

const ProductPage = ({match}) => {
  const product = products.find(p => p._id === match.params.id)
  return (
    <div>
      <Link to="/" className='btn btn-outline-dark my-3'>
        Home Page
      </Link>

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
            <ListGroup>
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
    </div>
  )
}

export default ProductPage;
