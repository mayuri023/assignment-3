import React, { useState, useEffect } from "react";
import axios from "axios";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/courses").then((response) => {
      const allEnquiries = response.data.reduce((acc, course) => {
        return [...acc, ...course.enquiries.map((enquiry) => ({ courseId: course.id, ...enquiry }))];
      }, []);
      setEnquiries(allEnquiries);
    });
  }, []);

  return (
    <div>
      <h1>Enquiries List</h1>
      {enquiries.map((enquiry, index) => (
        <div key={index}>
          <h3>Course ID: {enquiry.courseId}</h3>
          <p>Name: {enquiry.name}</p>
          <p>Email: {enquiry.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default EnquiryList;
