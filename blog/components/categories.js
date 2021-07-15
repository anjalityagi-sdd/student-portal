import React from "react";
import { Nav } from "react-bootstrap";

const Categories = ({ isLoading, categoryList }) => {
  return (
    <Nav className="flex-row justify-content-start align-items-center upper-index">
      <h3>Category:</h3>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link eventKey="all">All Posts</Nav.Link>
          </Nav.Item>
          {categoryList.data?.map((category, index) => (
            <Nav.Item key={index}>
              <Nav.Link eventKey={category._id}>{category.title}</Nav.Link>
            </Nav.Item>
          ))}
        </>
      )}
    </Nav>
  );
};
export default Categories;
