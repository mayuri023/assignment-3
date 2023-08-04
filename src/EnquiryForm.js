import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EnquiryForm = () => {
  const { courseId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const enquiry = { name, email };
    axios.post(`http://localhost:3001/courses/${courseId}/enquiries`, enquiry);
  };

  return (
    <div>
      <h2>Enquire for the Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
