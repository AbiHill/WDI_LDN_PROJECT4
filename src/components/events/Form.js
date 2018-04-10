import React from 'react';
import AutoComplete from '../common/AutoComplete';
import ReactFilestack from 'filestack-react';

const apiKey = 'AU5Uo7xXbRUezl3OcFq3Zz';



const Form = ({ handleChange, handleSubmit, data, handleFilestack }) => {
  console.log('this is the data', data.sport);
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Event Name</label>
        <input
          className="input"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
        {/* {data.errors.name && <small>{data.errors.name}</small>} */}
      </div>
      <div className="field">
        <label htmlFor="sport">Sport</label>
        <select name="sport"
          onChange={handleChange}
          value={data.sport}>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
          <option value="volleyball">Volleyball</option>
          <option value="tennis">Tennis</option>
          <option value="golf">Golf</option>
          <option value="frisbee">Frisbee</option>
          <option value="badminton">Badminton</option>
          <option value="tabletennis">Table Tennis</option>
          <option value="running">Running</option>
        </select>
        {/* {data.errors.sport && <small>{data.errors.sport}</small>} */}
      </div>
      <div className="field">
        <label htmlFor="address">Address</label>
        <AutoComplete
          className="input"
          placeholder="Address"
          name="address"
          value={data.address.adress}
          onChange={handleChange}
        />
        {/* {data.errors.address && <small>{data.errors.address}</small>} */}
      </div>
      <div className="field">
        {/* <label htmlFor="name">Image</label>
        <input
          className="input"
          placeholder="Image"
          name="image"
          onChange={handleChange}
          value={data.image}
        /> */}
        {/* {data.errors.image && <small>{data.errors.image}</small>} */}
      </div>
      <ReactFilestack
        apikey={apiKey}
        buttonText="Upload Image"
        buttonClass="classname"
        // onSuccess={res => this.setState({ image: res.filesUploaded[0].url}, () => console.log(this.state))}
        // options={options}
        onSuccess={res => handleFilestack(res)}
      />
      <img src={`${data.image}`} />
      {/* <div className="field">
        <label htmlFor="date">date</label>
        <input
          type="date"
          className="input"
          placeholder="date"
          name="date"
          onChange={handleChange}
          value={data.date}
        />
        {/* {data.errors.date && <small>{data.errors.date}</small>}
      </div> */}
      <div className="field">
        <label htmlFor="dateTime">Date & time</label>
        <input
          type="datetime-local"
          className="input"
          placeholder="dateTime"
          name="dateTime"
          onChange={handleChange}
          value={data.dateTime}
        />
        {/* {data.errors.time && <small>{data.errors.time}</small>} */}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          className="input"
          placeholder="description"
          name="description"
          onChange={handleChange}
          value={data.description}

        />
        {/* {data.errors.description && <small>{data.errors.description}</small>} */}
      </div>
      <div className="field">
        <label htmlFor="teamSize">Team Size</label>
        <input
          className="input"
          placeholder="Team Size"
          name="teamSize"
          onChange={handleChange}
          value={data.teamSize}
        />
        {/* {data.errors.description && <small>{data.errors.description}</small>} */}
      </div>

      <button className="button is-primary">Submit</button>
    </form>
  );
};

export default Form;
