import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Tab, Col, Row, Container } from "react-bootstrap";
import Categories from "./components/categories";
import "./blog.scss";
import { getCategoryList } from "../../redux/action/Categories";
import { getBlogs } from "../../redux/action/Blogs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState("all");
  const [page, setPage] = useState(0);
  const { isLoading, categoryList } = useSelector(state => {
    return state.categories;
  });
  const { isLoading: isBlogLoading, blogList } = useSelector(state => {
    return state.blogs;
  });
  useEffect(() => {
    //fetch categories
    dispatch(getCategoryList());
  }, [dispatch]);
  useEffect(() => {
    if (currentTab === "all") {
      //fetch all blogs
      dispatch(getBlogs({ currentTab: "", page: 1, count: 12 }));
    } else {
      dispatch(getBlogs({ categoryId: currentTab, page: 1, count: 12 }));
    }
    setPage(0);
  }, [dispatch, currentTab]);

  //to get the data on page change
  const handlePageClick = data => {
    let page = data.selected + 1;
    setPage(data.selected);
    if (currentTab === "all") {
      dispatch(getBlogs({ categoryId: "", page, count: 12 }));
    } else {
      dispatch(getBlogs({ categoryId: currentTab, page, count: 12 }));
    }
  };
  let char_limit = 300;
  const loadData = () => {
    if (isBlogLoading) {
      return <div>Loading...</div>;
    } else if (blogList && blogList.contacts.length) {
      return blogList.contacts.map((blog, index) => {
        let divHtml = null;
        let trimmedString = blog.short_description.substr(0, char_limit);
        trimmedString =
          trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
          ) + "...";
        if (index === 3) {
          divHtml = (
            <Col md={12}>
              <div className="center-info">
                <h3>You can BEAST your Test with us.</h3>
              </div>
            </Col>
          );
        }
        return (
          <>
            {divHtml}
            <Col
              key={index}
              md={4}
              sm={6}
              onClick={() => history.push(`/blog/${blog.slug}`)}
            >
              <div className="blog-box">
                {blog.imageLink ? (
                  <div className="blog-image">
                    <img
                      src={blog.imageLink}
                      className="img-fluid"
                      alt="blog"
                    />
                  </div>
                ) : null}
                <div className="blog-data">
                  <h5>{blog.title}</h5>
                  {/* set the innerHTML */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: trimmedString
                    }}
                  ></p>
                </div>
              </div>
            </Col>
          </>
        );
      });
    }
  };
  return (
    <>
      <section className="blog-page">
        <Container>
          <Row>
            <Col sm={12}>
              <small>Resource Centre</small>
              <h2 className="mt-3">Blog - Tutoring Center</h2>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="schedules-tabs blog">
        <Tab.Container
          id="schedules-tab"
          defaultActiveKey="all"
          onSelect={key => setCurrentTab(key)}
        >
          <Container>
            <Row>
              <Col md={12}>
                <Categories isLoading={isLoading} categoryList={categoryList} />
              </Col>
              <Col md={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="all">
                    <Row className="mt-2">{loadData()}</Row>
                  </Tab.Pane>
                  {categoryList.data?.map((category, index) => {
                    return (
                      <Tab.Pane key={index} eventKey={category._id}>
                        <Row className="mt-5">{loadData()}</Row>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Container>
        </Tab.Container>

        <div className="row" className="center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={"Next Page"}
            pageCount={Math.ceil((blogList?.totalContact || 0) / 12)}
            forcePage={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            nextClassName={"next-button"}
            nextLinkClassName={"next-link"}
          />
        </div>
      </section>

      <section className="green-search mt-5">
        <Container>
          <Row>
            <Col sm={12}>
              <div className=" green-container">
                <a href="#" className="contact-us-btn">
                  Contact Us
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Blog;
