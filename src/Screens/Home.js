import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import ReactDOM from "react-dom";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Home() {
  const { register, handleSubmit, errors } = useForm();
  const [videos, setVideos] = useState(null);
  const onSubmit = (data) => {
    const toSend = {
      ytvideo: data.videourl,
    };
    console.log(data);
    axios
      .post("https://desolate-dawn-05874.herokuapp.com/youtube", toSend)
      .then((res) => {
        console.log(typeof res.data.Subtitle);
        setVideos(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const validateUrl = (url) => {
    if (/youtu\.?be/.test(url)) {
      // Look first for known patterns
      var i;
      var patterns = [
        /youtu\.be\/([^#\&\?]{11})/, // youtu.be/<id>
        /\?v=([^#\&\?]{11})/, // ?v=<id>
        /\&v=([^#\&\?]{11})/, // &v=<id>
        /embed\/([^#\&\?]{11})/, // embed/<id>
        /\/v\/([^#\&\?]{11})/, // /v/<id>
      ];

      // If any pattern matches, return the ID
      for (i = 0; i < patterns.length; ++i) {
        if (patterns[i].test(url)) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <h5 class="card-title">Get Subtitle of a video</h5>
            <div class="dropdown-divider mb-3"></div>

            <Row>
              <Col md="3">
                <Form.Label htmlFor="videourl">Video Url</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  //  validate: validateProxy,
                  ref={register({
                    required: true,
                    validate: validateUrl,
                  })}
                  name="videourl"
                  id="videourl"
                  placeholder="Enter video url"
                />
                {errors.videourl && (
                  <p style={{ color: "red", marginTop: "4px" }}>
                    A valid video url is required
                  </p>
                )}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row className="mt-2">
              <Col md="3"></Col>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button className="ml-1" variant="danger" type="reset">
                  Reset
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        {videos && (
          <div>
            <h1>Subtitle:</h1>
            {videos.Subtitle.map((text, index) => {
              return <p>{text.text}</p>;
            })}
          </div>
        )}
      </Container>
    </>
  );
}

export default Home;
