import React, { useState } from "react";
import axios from "axios";
import feedback from "./feedback.json"

interface FormState {
  name: string;
  course: string;
  strengths: string;
  improvements: string;
}

const initialFormState: FormState = {
  name: "",
  course: "",
  strengths: "",
  improvements: "",
};

const ReportWriter: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    
    if(name === "strengths" || name === "improvements"){
      const previousValues = form[name].length > 0 ? form[name].split(", ") : [];
  
      if (checked) {
        setForm({
          ...form,
          [name]: [...previousValues, value].join(", "),
        });
      } else {
        const updatedValues = previousValues.filter((item) => item !== value);
        setForm({
          ...form,
          [name]: updatedValues.join(", "),
        });
      }
    }
  };

  console.log("strengths:", form.strengths)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(form);
    // handle form submission here
  };

  return (
    <div className="absolute top-0 left-0 text-white">
    <form onSubmit={handleSubmit} className="p-4">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          className="border m-2"
        />
      </label>
      <label>
        Course:
        <input
          type="text"
          name="course"
          value={form.course}
          onChange={handleInputChange}
          className="border m-2"
        />
      </label>
      <fieldset>
        <legend>Areas of Strengths</legend>
        {/* Replace 'placeholder1', 'placeholder2', etc. with real values */}
        {['placeholder1', 'placeholder2', 'placeholder3'].map((placeholder, index) => (
          <label key={index}>
            <input 
              type="checkbox" 
              name="strengths" 
              value={placeholder} 
              checked={form.strengths.includes(placeholder)} 
              onChange={handleCheckboxChange}
            />
            {placeholder}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Opportunities for Improvement</legend>
        {['placeholder1', 'placeholder2', 'placeholder3'].map((placeholder, index) => (
          <label key={index}>
            <input 
              type="checkbox" 
              name="improvements" 
              value={placeholder} 
              checked={form.improvements.includes(placeholder)} 
              onChange={handleCheckboxChange}
            />
            {placeholder}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded">Submit</button>
      </form>
      </div>
  );
}

export default ReportWriter;
